import Koa from 'koa';

import { getLog } from "../../services/internal/logService";
import { api } from '../../constants/api';
import { errorResponse } from '../httpResponse/errorResponse';

export const hasCaptcha = async (ctx: Koa.DefaultContext, next: () => Promise<any>): Promise<boolean> => {
    const currentAuthHeader = ctx.get(api.captcha.header) ?? '';
    if (currentAuthHeader == null || `${currentAuthHeader}`.length < 10) {
        const errMsg = 'Captcha - not supplied';
        getLog().i(errMsg);
        errorResponse({
            ctx,
            next,
            statusCode: 401,
            message: errMsg,
        });
        return false;
    }

    // Verify captcha

    return true;
}
