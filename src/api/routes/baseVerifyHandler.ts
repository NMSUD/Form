import Koa from 'koa';

import { IVerifyRequestParams } from '@api/contracts/verifyRequestParam';
import { errorResponse } from '@api/misc/httpResponse/errorResponse';
import { IApiModule } from '@api/module/baseModule';
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
        statusCode: ApiStatusErrorCode.decisionNotFound,
        message: errMsg,
      });
      return;
    }

    const readRecordResult = await module.readRecord(params.id);
    if (readRecordResult.isSuccess == false || readRecordResult.value == null) {
      const errMsg = `${handlerName}: An error occurred while getting a db record with id: ${params.id}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.recordNotFound,
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
        statusCode: ApiStatusErrorCode.calculatedCheckFailed,
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
        statusCode: ApiStatusErrorCode.couldNotPersistData,
        message: errMsg,
      });
      return;
    }

    const discordWebhookId = readRecordResult.value.discordWebhookId;
    if (discordWebhookId != null) {
      getLog().i(`${handlerName}: Updating Discord message`);
      const msgColour = colourFromApprovalStatus(approvalStatus);
      const authorName = module.getName(readRecordResult.value);
      const iconUrl = module.getIcon?.(readRecordResult.value);
      const webhookPayload = baseSubmissionMessageBuilder({
        content: '',
        colour: msgColour,
        authorName,
        iconUrl,
        descripLines: [
          ...getDescriptionLines({
            data: readRecordResult.value,
            dtoMeta: module.dtoMeta,
            additionalItemsToDisplay: module.additionalPropsToDisplay,
          }),
          `\n**Decision: ${getFriendlyApprovalStatus(approvalStatus)}**`,
        ],
        additionalEmbeds: [],
      });
      await getDiscordService().updateDiscordMessage(
        getConfig().getDiscordWebhookUrl(),
        discordWebhookId,
        webhookPayload,
      );
    }

    ctx.response.status = 303;
    ctx.redirect(urlSegments.join(''));
    await next();
  };