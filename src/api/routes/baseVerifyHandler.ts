import Koa from 'koa';

import { IVerifyRequestParams } from '@api/contracts/verifyRequestParam';
import { errorResponse } from '@api/misc/httpResponse/errorResponse';
import { IApiModule } from '@api/types/baseModule';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import {
  approvalStatusFromString,
  colourFromApprovalStatus,
  getFriendlyApprovalStatus,
} from '@constants/enum/approvalStatus';
import { routes } from '@constants/route';
import { DiscordWebhookResponse } from '@contracts/generated/discordWebhookResponse';
import { baseSubmissionMessageBuilder, getDescriptionLines } from '@helpers/discordMessageHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { getDiscordService } from '@services/external/discord/discordService';
import { getGithubWorkflowService } from '@services/external/githubWorkflowService';
import { getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { ResultWithValue } from '@contracts/resultWithValue';
import { lineBreak } from '@constants/form';

export const baseVerifyHandler =
  <TD, TF, TP>(module: IApiModule<TD, TF, TP>) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const params: IVerifyRequestParams = {
      id: ctx.params[apiParams.verify.id],
      decision: ctx.params[apiParams.verify.decision],
      check: ctx.params[apiParams.verify.check],
    };
    const handlerName = `verifyHandler ${module.segment} ${params.id}`;
    getLog().i(handlerName);

    const approvalStatus = approvalStatusFromString(params.decision);
    if (approvalStatus == null) {
      const errMsg = `${handlerName}: Approval status not understood: ${params.decision}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.decisionNotFound.code,
        message: errMsg,
      });
      return;
    }

    const urlSegments = [
      getConfig().getNmsUdFormWebUrl(),
      '/#/',
      routes.verify.path,
      '?',
      routes.verify.queryParam.id,
      '=',
      params.id,
    ];

    const readRecordResult = await module.readRecord(params.id);
    if (readRecordResult.isSuccess == false) {
      const errMsg = `${handlerName}: An error occurred while getting a db record with id: ${params.id}`;
      getLog().e(errMsg);
      const additionalUrlSegments = [
        '&',
        routes.verify.queryParam.code,
        '=',
        ApiStatusErrorCode.recordNotFound.code,
        '&',
        routes.verify.queryParam.message,
        '=',
        encodeURI('Could not find submission!'),
        '&',
        routes.verify.queryParam.detail,
        '=',
        encodeURI(
          'The link you clicked is no longer valid! The submission may have been deleted...',
        ),
      ];
      ctx.response.status = 303;
      ctx.response.body = ApiStatusErrorCode.recordNotFound.code;
      ctx.redirect([...urlSegments, ...additionalUrlSegments].join(''));
      await next();
      return;
    }
    const discordWebhookId = readRecordResult.value.discordWebhookId;

    if (readRecordResult.value.approvalStatus == approvalStatus) {
      getLog().i(`${handlerName}: Approval status received matches what is in the database`);
      const additionalUrlSegments = [
        '&',
        routes.verify.queryParam.code,
        '=',
        '200',
        '&',
        routes.verify.queryParam.message,
        '=',
        encodeURI('No changes made'),
        '&',
        routes.verify.queryParam.detail,
        '=',
        encodeURI('The selected decision was already made, so no changes required. '),
        encodeURI(
          discordWebhookId == null
            ? 'Unable to update Discord message'
            : 'Attempting to update discord message...',
        ),
      ];
      ctx.response.status = 303;
      ctx.response.body = 200;
      ctx.redirect([...urlSegments, ...additionalUrlSegments].join(''));
      await next();
      return;
    }

    try {
      const calculatedCheck = module.calculateCheck(readRecordResult.value);
      if (calculatedCheck != parseInt(params.check)) {
        throw 'calculated check value does not match the supplied check';
      }
    } catch (ex) {
      const errMsg = `${handlerName}: The calculated check value does not match the supplied check value. Maybe the data changed?`;
      getLog().e(errMsg);
      const additionalUrlSegments = [
        '&',
        routes.verify.queryParam.code,
        '=',
        ApiStatusErrorCode.calculatedCheckFailed.code,
        '&',
        routes.verify.queryParam.message,
        '=',
        encodeURI('Invalid check value'),
        '&',
        routes.verify.queryParam.detail,
        '=',
        encodeURI(errMsg),
      ];
      ctx.response.status = 303;
      ctx.response.body = ApiStatusErrorCode.calculatedCheckFailed.code;
      ctx.redirect([...urlSegments, ...additionalUrlSegments].join(''));
      await next();
      return;
    }

    const updatedPersistence = {
      ...readRecordResult.value,
      approvalStatus,
    };

    getLog().i(`${handlerName}: Updating database record`);
    const updateRecordResult = await module.updateRecord(updatedPersistence.id, updatedPersistence);
    if (updateRecordResult.isSuccess == false) {
      const errMsg = `${handlerName}: An error occurred while updating the approval status of record: ${params.id}`;
      getLog().e(errMsg);
      const additionalUrlSegments = [
        '&',
        routes.verify.queryParam.code,
        '=',
        ApiStatusErrorCode.couldNotPersistData.code,
        '&',
        routes.verify.queryParam.message,
        '=',
        encodeURI('Could not update the database'),
        '&',
        routes.verify.queryParam.detail,
        '=',
        encodeURI(errMsg),
      ];
      ctx.response.status = 303;
      ctx.response.body = ApiStatusErrorCode.couldNotPersistData.code;
      ctx.redirect([...urlSegments, ...additionalUrlSegments].join(''));
      await next();
      return;
    }

    const githubWorkflowTriggerTask = getGithubWorkflowService().triggerWorkflowIfNotRunRecently();
    let discordMessageTask: Promise<ResultWithValue<DiscordWebhookResponse>> =
      Promise.resolve(anyObject);

    const tempDto = module.mapPersistenceToDto(readRecordResult.value);
    let dtoForDiscord = { ...tempDto };
    if (module.mapRecordRelationshipsToDto != null) {
      const dtoResult = await module.mapRecordRelationshipsToDto(
        readRecordResult.value.id,
        tempDto,
      );
      dtoForDiscord = dtoResult.value;
    }

    if (discordWebhookId != null) {
      getLog().i(`${handlerName}: Updating Discord message`);
      const msgColour = colourFromApprovalStatus(approvalStatus);
      const authorName = module.getName(readRecordResult.value);
      const iconUrl = module.getIcon?.(readRecordResult.value);
      const descripLines = await getDescriptionLines({
        data: dtoForDiscord,
        dtoMeta: module.dtoMeta,
      });
      const webhookPayload = baseSubmissionMessageBuilder({
        content: '',
        colour: msgColour,
        authorName,
        iconUrl,
        descripLines: [
          ...descripLines,
          `\n**Decision: ${getFriendlyApprovalStatus(approvalStatus)}**`,
        ],
        additionalEmbeds: [],
      });
      discordMessageTask = getDiscordService().updateDiscordMessage(
        getConfig().getDiscordWebhookUrl(),
        discordWebhookId,
        webhookPayload,
      );
    } else {
      discordMessageTask = Promise.resolve({
        isSuccess: false,
        value: anyObject,
        errorMessage: 'Discord WebhookId was null in the database',
      });
    }

    const [githubWorkflowResult, discordMessageResult] = await Promise.all([
      githubWorkflowTriggerTask,
      discordMessageTask, //
    ]);

    const additionalUrlSegments = [
      '&',
      routes.verify.queryParam.code,
      '=',
      '200',
      '&',
      routes.verify.queryParam.message,
      '=',
      encodeURI(`Your action was successfully handled.`),
      '&',
      routes.verify.queryParam.detail,
      '=',
      encodeURI(`Github Action response: ${githubWorkflowResult.errorMessage}${lineBreak}`),
      encodeURI(
        `Discord webhook message update was ${discordMessageResult.isSuccess ? 'successful' : 'unsuccessful'}.${lineBreak}`,
      ),
      !discordMessageResult.isSuccess
        ? encodeURI(`Discord error message: "${discordMessageResult.errorMessage}".`)
        : '',
    ];
    ctx.response.status = 303;
    ctx.response.body = 200;
    ctx.redirect([...urlSegments, ...additionalUrlSegments].join(''));
    await next();
    return;
  };
