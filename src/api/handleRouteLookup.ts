import Koa from 'koa';

import { errorResponse } from '@api/misc/httpResponse/errorResponse';
import { IHandlerLookup, koaRequestHandler } from '@api/types/handlerTypes';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { getLog } from '@services/internal/logService';

export const handleRouteLookup =
  (lookup: IHandlerLookup) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const segment = ctx.params[apiParams.general.segment];
    const lookupThatCanBeIndexed = lookup as { [x: string]: koaRequestHandler };
    const handler = lookupThatCanBeIndexed[segment];
    if (handler == null) {
      const errMsg = `Correct route not found for ${segment}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.segmentNotFound,
        message: errMsg,
      });
      return;
    }

    await handler(ctx, next);
  };
