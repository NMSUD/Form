import Koa from 'koa';

import { hasCaptcha } from '@api/guard/hasCaptcha';
import { errorResponse } from '@api/misc/httpResponse/errorResponse';
import { IApiModule, IRecordRequirements } from '@api/types/baseModule';
import { ApiStatusErrorCode } from '@constants/api';
import { ApprovalStatus, colourFromApprovalStatus } from '@constants/enum/approvalStatus';
import { FormDataKey } from '@constants/form';
import {
  baseSubmissionMessageBuilder,
  baseSubmissionMessageEmbed,
  getDescriptionLines,
} from '@helpers/discordMessageHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { getDiscordService } from '@services/external/discord/discordService';
import { getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { validateObj } from '@validation/baseValidation';

export const baseFormHandler =
  <TD, TF, TP>(module: IApiModule<TD, TF, TP>) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const handlerName = `formHandler-${module.name}`;
    getLog().i(handlerName);

    const formDataFiles = ctx.request?.files ?? anyObject;
    const formDataBody = ctx.request?.body ?? anyObject;

    const isCaptchaEnabled = getConfig().getCaptchaEnabled();
    if (isCaptchaEnabled === true) {
      const captchaString = formDataBody[FormDataKey.captcha];
      const captchaTest = hasCaptcha(captchaString);
      const captchaIsValid = await captchaTest(ctx, next);
      if (captchaIsValid === false) {
        const errMsg = `Captcha test: could not verify result`;
        getLog().i(errMsg);
        await errorResponse({
          ctx,
          next,
          statusCode: ApiStatusErrorCode.badCaptcha.code,
          message: errMsg,
        });
        return;
      }
    }

    const fileObjResult = await module.handleFilesInFormData(formDataFiles);
    if (fileObjResult.isSuccess === false) {
      const errMsg = `${handlerName} handle files: ${fileObjResult.errorMessage}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.invalidFormFiles.code,
        message: errMsg,
      });
      return;
    }

    let data: TD = anyObject;
    try {
      const dataString = formDataBody[FormDataKey.data];
      data = JSON.parse(dataString);
    } catch (ex) {
      const errMsg = `${handlerName} formdata mapping: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.invalidFormData.code,
        message: errMsg,
      });
      return;
    }

    const failedValidationMsgs = validateObj<TD>({
      data: data,
      validationObj: module.dtoMeta,
    }).filter((v) => v.isValid === false);

    if (failedValidationMsgs.length > 0) {
      getLog().e(`Validation failed. Num errors ${failedValidationMsgs.length}`);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.validation.code,
        message: `Validation failed: ${failedValidationMsgs.map((v) => v.errorMessage).join(',\n')}`,
      });
      return;
    }

    const persistence = module.mapDtoWithImageToPersistence(data, fileObjResult.value);
    const createdRecordResult = await module.createRecord(persistence);
    if (createdRecordResult.isSuccess == false) {
      const errMsg = `${handlerName} - create db record - ${createdRecordResult.errorMessage}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.couldNotPersistData.code,
        message: errMsg,
      });
      return;
    }

    if (module.createRecordRelationships != null) {
      const createRelationshipsResult = await module.createRecordRelationships(
        data,
        createdRecordResult.value,
      );
      if (createRelationshipsResult.isSuccess == false) {
        const errMsg = `${handlerName} - create db record relationships - ${createRelationshipsResult.errorMessage}`;
        getLog().e(errMsg);
        await errorResponse({
          ctx,
          next,
          statusCode: ApiStatusErrorCode.couldNotPersistData.code,
          message: errMsg,
        });
        return;
      }
    }

    const persistenceWithImgUrls = module.getPublicUrlsOfUploads(createdRecordResult.value);
    const authorName = module.getName(persistenceWithImgUrls);
    const iconUrl = module.getIcon?.(persistenceWithImgUrls);
    const msgColour = colourFromApprovalStatus(ApprovalStatus.pending);

    const tempDto = module.mapPersistenceToDto(persistenceWithImgUrls);
    let dtoForDiscord = { ...tempDto };
    if (module.mapRecordRelationshipsToDto != null) {
      const dtoResult = await module.mapRecordRelationshipsToDto(
        persistenceWithImgUrls.id,
        tempDto,
      );
      dtoForDiscord = dtoResult.value;
    }

    const discordUrl = getConfig().getDiscordWebhookUrl();
    const webhookPayload = baseSubmissionMessageBuilder({
      content: '',
      authorName: authorName,
      iconUrl: iconUrl ?? undefined,
      colour: msgColour,
      descripLines: await getDescriptionLines({
        data: dtoForDiscord,
        dtoMeta: module.dtoMeta,
        persistenceMeta: module.persistenceMeta,
      }),
      additionalEmbeds: [
        baseSubmissionMessageEmbed(
          createdRecordResult.value.id,
          module.calculateCheck(createdRecordResult.value),
          module.segment,
        ),
      ],
    });
    const discordResponse = await getDiscordService().sendDiscordMessage(
      discordUrl,
      webhookPayload,
    );
    if (discordResponse.isSuccess) {
      await module.updateRecord(createdRecordResult.value.id, {
        ...persistenceWithImgUrls,
        id: createdRecordResult.value.id,
        discordWebhookId: discordResponse.value.id,
      } as TP & IRecordRequirements);
    }

    ctx.response.status = 200;
    ctx.set('Content-Type', 'application/json');
    ctx.body = createdRecordResult.value;

    await next();
  };
