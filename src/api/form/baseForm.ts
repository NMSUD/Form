import Koa from 'koa';
import { getLog } from '../../services/internal/logService';
import { nameof } from '../../helper/propHelper';
import { IValidationObject, validateObj } from '../../contracts/validation/baseValidation';
import { hasCaptcha } from '../guard/hasCaptcha';
import { Result } from '../../contracts/resultWithValue';
import { errorResponse } from '../httpResponse/errorResponse';

export interface IFormHandler<T> {
    name: string;
    validationObj: IValidationObject<T>;
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

        const failedValidationMsgs = validateObj(
            mappedBodyParams,
            props.validationObj
        ).filter(v => v.isValid === false);

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