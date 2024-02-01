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
import {
  baseSubmissionMessageBuilder,
  getDescriptionLines,
} from '@services/external/discord/discordMessageBuilder';
import { getDiscordService } from '@services/external/discord/discordService';
import { getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';

export const baseVerifyHandler =
  <TD, TF, TP>(module: IApiModule<TD, TF, TP>) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const name = `verifyHandler-${module.name}`;

    const params: IVerifyRequestParams = {
      id: ctx.params[apiParams.verify.id],
      decision: ctx.params[apiParams.verify.decision],
      check: ctx.params[apiParams.verify.check],
    };
    getLog().i(`${name}-id-${params.id}`);

    const approvalStatus = approvalStatusFromString(params.decision);
    if (approvalStatus == null) {
      const errMsg = `Approval status not understood: ${params.decision}`;
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
      const errMsg = `An error occurred while getting a db record with id: ${params.id}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.recordNotFound,
        message: errMsg,
      });
      return;
    }

    try {
      const calculatedCheck = module.calculateCheck(readRecordResult.value);
      if (calculatedCheck != parseInt(params.check)) {
        throw 'calculated check value does not match the supplied check';
      }
    } catch (ex) {
      const errMsg = `The calculated check value does not match the supplied check value. Maybe the data changed?`;
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

    const updateRecordResult = await module.updateRecord(updatedPersistence.id, updatedPersistence);
    if (updateRecordResult.isSuccess == false) {
      const errMsg = `An error occurred while updating the approval status of record: ${params.id}`;
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
      const msgColour = colourFromApprovalStatus(approvalStatus);
      const webhookPayload = baseSubmissionMessageBuilder({
        content: '',
        colour: msgColour,
        descripLines: getDescriptionLines({
          data: readRecordResult.value,
          dtoMeta: module.dtoMeta,
          additionalItemsToDisplay: module.additionalPropsToDisplay,
        }),
        additionalEmbeds: [
          {
            color: msgColour,
            description: `Decision: ${getFriendlyApprovalStatus(approvalStatus)}`,
          },
        ],
      });
      await getDiscordService().updateDiscordMessage(
        getConfig().getDiscordWebhookUrl(),
        discordWebhookId,
        webhookPayload,
      );
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
    ctx.response.status = 301;
    ctx.redirect(urlSegments.join(''));

    await next();
  };
