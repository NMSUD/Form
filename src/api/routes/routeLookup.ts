import Koa from 'koa';

import { errorResponse } from '@api/misc/httpResponse/errorResponse';
import { communityModule } from '@api/module/community/communityModule';
import { ApiStatusErrorCode, IApiSegment, apiParams } from '@constants/api';
import { getLog } from '@services/internal/logService';
import { baseFormHandler } from './baseFormHandler';
import { baseStatusHandler } from './baseStatusHandler';
import { baseVerifyHandler } from './baseVerifyHandler';
import { nameof } from '@helpers/propHelper';

type koaRequestHandler = (
  ctx: Koa.DefaultContext,
  next: () => Promise<Koa.BaseResponse>,
) => Promise<void>;

type IHandlerLookup = {
  [prop in keyof IApiSegment as string]: koaRequestHandler;
};

export const formHandlerLookup: IHandlerLookup = {
  community: baseFormHandler(communityModule),
};

export const statusHandlerLookup: IHandlerLookup = {
  community: baseStatusHandler(communityModule),
};

export const verifyHandlerLookup: IHandlerLookup = {
  community: baseVerifyHandler(communityModule),
};

export const routeToCorrectHandler =
  (lookup: IHandlerLookup) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const segment = ctx.params[apiParams.form.segment];
    const handler = lookup[segment];
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
