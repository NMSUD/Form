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
import { baseSubmissionMessageBuilder, getDescriptionLines } from '@helpers/discordMessageHelper';
import { getDiscordService } from '@services/external/discord/discordService';
import { getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { getGithubWorkflowService } from '@services/external/githubWorkflowService';

export const baseVerifyHandler =
  <TD, TF, TP>(module: IApiModule<TD, TF, TP>) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const params: IVerifyRequestParams = {
      id: ctx.params[apiParams.verify.id],
      decision: ctx.params[apiParams.verify.decision],
      check: ctx.params[apiParams.verify.check],
    };
    const handlerName = `verifyHandler ${module.name} ${params.id}`;
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

    const readRecordResult = await module.readRecord(params.id);
    if (readRecordResult.isSuccess == false) {
      const errMsg = `${handlerName}: An error occurred while getting a db record with id: ${params.id}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.recordNotFound.code,
        message: errMsg,
      });
      return;
    }

    const urlSegments = [
      getConfig().getNmsUdFormWebUrl(),
      '/#/',
      routes.verify.path,
      '?',
      routes.verify.queryParam.decision,
      '=',
      params.decision,
    ];
    if (readRecordResult.value.approvalStatus == approvalStatus) {
      getLog().i(`${handlerName}: Approval status recieved matches what is in the database`);
      ctx.response.status = 303;
      ctx.redirect(urlSegments.join(''));
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
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.calculatedCheckFailed.code,
        message: errMsg,
      });
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
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.couldNotPersistData.code,
        message: errMsg,
      });
      return;
    }

    const githubWorkflowTriggerTask = getGithubWorkflowService().triggerWorkflowIfNotRunRecently();
    let discordMessageTask: Promise<unknown> = Promise.resolve();

    const tempDto = module.mapPersistenceToDto(readRecordResult.value);
    let dtoForDiscord = { ...tempDto };
    if (module.mapRecordRelationshipsToDto != null) {
      const dtoResult = await module.mapRecordRelationshipsToDto(
        readRecordResult.value.id,
        tempDto,
      );
      dtoForDiscord = dtoResult.value;
    }

    const discordWebhookId = readRecordResult.value.discordWebhookId;
    if (discordWebhookId != null) {
      getLog().i(`${handlerName}: Updating Discord message`);
      const msgColour = colourFromApprovalStatus(approvalStatus);
      const authorName = module.getName(readRecordResult.value);
      const iconUrl = module.getIcon?.(readRecordResult.value);
      const descripLines = await getDescriptionLines({
        data: dtoForDiscord,
        dtoMeta: module.dtoMeta,
        persistenceMeta: module.persistenceMeta,
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
    }

    await Promise.all([
      githubWorkflowTriggerTask,
      discordMessageTask, //
    ]);

    ctx.response.status = 303;
    ctx.redirect(urlSegments.join(''));
    await next();
  };
