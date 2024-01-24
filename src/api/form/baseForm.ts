import Koa from 'koa';

import { Result } from '../../contracts/resultWithValue';
import { validateObj } from '../../contracts/validation/baseValidation';
import { getLog } from '../../services/internal/logService';
import { hasCaptcha } from '../guard/hasCaptcha';
import { errorResponse } from '../httpResponse/errorResponse';
import { IFormDtoMeta } from '../../contracts/dto/forms/baseFormDto';

export interface IFormHandler<T> {
    name: string;
    validationObj: IFormDtoMeta<T>;
    handleBody: (body: T) => Result;
}

export const baseHandleFormSubmission = <T>
    (props: IFormHandler<T>) =>
    async (ctx: Koa.DefaultContext, next: () => Promise<any>) => {
        getLog().i(`formHandler-${props.name}`);

        const captchaIsValid = await hasCaptcha(ctx, next);
        if (captchaIsValid === false) return;

        const bodyParams: any = ctx.request.body;
        const mappedBodyParams: T = bodyParams;

        const failedValidationMsgs = validateObj<T>({
            data: mappedBodyParams,
            validationObj: props.validationObj
        }).filter(v => v.isValid === false);

        if (failedValidationMsgs.length > 0) {
            errorResponse({
                ctx,
                next,
                statusCode: 400,
                message: 'Validation failed: ' + failedValidationMsgs.map(v => v.errorMessage).join(',\n'),
            });
            return;
        }

        const handleDtoResult = props.handleBody(mappedBodyParams);
        if (handleDtoResult.isSuccess == false) {
            errorResponse({
                ctx,
                next,
                statusCode: 520,
                message: handleDtoResult.errorMessage,
            });
            return;
        }

        ctx.body = `success`;

        await next();
    }