import Koa from 'koa';

import { ApiStatusErrorCode } from '../../constants/api';
import { FormDataKey } from '../../constants/form';
import { IFormDtoMeta } from '../../contracts/dto/forms/baseFormDto';
import { DiscordWebhook } from '../../contracts/generated/discordWebhook';
import { IFormResponse } from '../../contracts/response/formResponse';
import { ResultWithValue } from '../../contracts/resultWithValue';
import { anyObject } from '../../helper/typescriptHacks';
import { IMessageBuilderProps } from '../../services/external/discord/discordMessageBuilder';
import { getDiscordService } from '../../services/external/discord/discordService';
import { getConfig } from '../../services/internal/configService';
import { getLog } from '../../services/internal/logService';
import { validateObj } from '../../validation/baseValidation';
import { hasCaptcha } from '../guard/hasCaptcha';
import { errorResponse } from '../httpResponse/errorResponse';
import { ApprovalStatus } from '../../constants/enum/approvalStatus';

export interface IFormHandler<T, TF> {
    name: string;
    validationObj: IFormDtoMeta<T>;
    handleRequest: (request: T, files: TF) => Promise<ResultWithValue<IFormResponse>>;
    handleFilesInFormData: (formData: any) => Promise<ResultWithValue<TF>>;
    discordMessageBuilder: (props: IMessageBuilderProps<T>) => DiscordWebhook;
    afterDiscordMessage: (recordId: string, webhookMessageId: string) => Promise<any>;
}

export const baseHandleFormSubmission = <T, TF>
    (props: IFormHandler<T, TF>) =>
    async (ctx: Koa.DefaultContext, next: () => Promise<any>) => {
        getLog().i(`formHandler-${props.name}`);

        const formDataFiles = ctx.request?.files ?? anyObject
        const formDataBody = ctx.request?.body ?? anyObject

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

        const fileObjResult = await props.handleFilesInFormData(formDataFiles);
        if (fileObjResult.isSuccess === false) {
            getLog().e(fileObjResult.errorMessage);
            await errorResponse({
                ctx,
                next,
                statusCode: ApiStatusErrorCode.invalidFormData,
                message: fileObjResult.errorMessage,
            });
            return;
        }

        let data: T = anyObject;
        try {
            const dataString = formDataBody[FormDataKey.data];
            data = JSON.parse(dataString);
        } catch (ex) {
            const errMsg = `formHandler-${props.name} formdata mapping: ${ex?.toString?.()}`;
            getLog().e(errMsg);
            await errorResponse({
                ctx,
                next,
                statusCode: ApiStatusErrorCode.invalidFormData,
                message: errMsg,
            });
            return;
        }

        const failedValidationMsgs = validateObj<T>({
            data: data,
            validationObj: props.validationObj,
        }).filter(v => v.isValid === false);

        if (failedValidationMsgs.length > 0) {
            getLog().e(`Validation failed. Num errors ${failedValidationMsgs.length}`);
            await errorResponse({
                ctx,
                next,
                statusCode: ApiStatusErrorCode.validation,
                message: `Validation failed: ${failedValidationMsgs.map(v => v.errorMessage).join(',\n')}`,
            });
            return;
        }

        const handleDtoResult = await props.handleRequest(data, fileObjResult.value);
        if (handleDtoResult.isSuccess == false) {
            await errorResponse({
                ctx,
                next,
                statusCode: ApiStatusErrorCode.couldNotPersistData,
                message: handleDtoResult.errorMessage,
            });
            return;
        }

        // Send discord message & update db record
        const discordUrl = getConfig().getDiscordWebhookUrl();
        const webhookPayload = props.discordMessageBuilder({
            id: handleDtoResult.value.id,
            dto: data,
            dtoMeta: props.validationObj,
            includeActionsEmbed: true,
            approvalStatus: ApprovalStatus.pending,
        });
        const discordResponse = await getDiscordService().sendDiscordMessage(discordUrl, webhookPayload);
        if (discordResponse.isSuccess) {
            await props.afterDiscordMessage(
                handleDtoResult.value.id,
                discordResponse.value.id
            );
        }

        ctx.response.status = 200;
        ctx.set('Content-Type', 'application/json');
        ctx.body = handleDtoResult.value;

        await next();
    }