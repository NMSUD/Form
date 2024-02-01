import Koa from 'koa';

import { hasCaptcha } from '@api/guard/hasCaptcha';
import { errorResponse } from '@api/misc/httpResponse/errorResponse';
import { IApiModule, IRecordRequirements } from '@api/module/baseModule';
import { ApiStatusErrorCode } from '@constants/api';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { FormDataKey } from '@constants/form';
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
          statusCode: ApiStatusErrorCode.badCaptcha,
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
        statusCode: ApiStatusErrorCode.invalidFormData,
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
        statusCode: ApiStatusErrorCode.invalidFormData,
        message: errMsg,
      });
      return;
    }

    const failedValidationMsgs = validateObj<TD>({
      data: data,
      validationObj: module.validationObj,
    }).filter((v) => v.isValid === false);

    if (failedValidationMsgs.length > 0) {
      getLog().e(`Validation failed. Num errors ${failedValidationMsgs.length}`);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.validation,
        message: `Validation failed: ${failedValidationMsgs.map((v) => v.errorMessage).join(',\n')}`,
      });
      return;
    }

    const persistence = module.mapDtoWithImageToPersistence(data, fileObjResult.value);
    const formResponse = await module.createRecord(persistence);
    if (formResponse.isSuccess == false) {
      const errMsg = `${handlerName} - create db record - ${formResponse.errorMessage}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.couldNotPersistData,
        message: errMsg,
      });
      return;
    }

    const discordUrl = getConfig().getDiscordWebhookUrl();
    const webhookPayload = module.discordMessageBuilder({
      dbId: formResponse.value.id,
      dto: data,
      segment: module.segment,
      dtoMeta: module.validationObj,
      calculateCheck: module.calculateCheck(formResponse.value),
      includeActionsEmbed: true,
      approvalStatus: ApprovalStatus.pending,
    });
    const discordResponse = await getDiscordService().sendDiscordMessage(
      discordUrl,
      webhookPayload,
    );
    if (discordResponse.isSuccess) {
      await module.updateRecord(formResponse.value.id, {
        ...persistence,
        id: formResponse.value.id,
        discordWebhookId: discordResponse.value.id,
      } as TP & IRecordRequirements);
    }

    ctx.response.status = 200;
    ctx.set('Content-Type', 'application/json');
    ctx.body = formResponse.value;

    await next();
  };
