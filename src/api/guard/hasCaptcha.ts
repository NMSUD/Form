import Koa from 'koa';

import { getLog } from '@services/internal/logService';
import { errorResponse } from '../misc/httpResponse/errorResponse';
import { getCaptchaService } from '@services/external/captchaService';

export const hasCaptcha =
  (captchaString: string) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>): Promise<boolean> => {
    if (captchaString == null || `${captchaString}`.length < 10) {
      const errMsg = 'Captcha - not supplied';
      getLog().i(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: 401,
        message: errMsg,
      });
      return false;
    }

    const captchaResponse = await getCaptchaService().verifyToken(captchaString);
    return captchaResponse.isSuccess;
  };
