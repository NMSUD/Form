import Koa from 'koa';

import { errorResponse } from '@api/misc/httpResponse/errorResponse';
import { builderModule } from '@api/module/builder/builderModule';
import { communityModule } from '@api/module/community/communityModule';
import { ApiStatusErrorCode, IApiSegment, apiParams } from '@constants/api';
import { getLog } from '@services/internal/logService';
import { baseFormHandler } from './baseFormHandler';
import { baseStatusHandler } from './baseStatusHandler';
import { baseVerifyHandler } from './baseVerifyHandler';

type koaRequestHandler = (
  ctx: Koa.DefaultContext,
  next: () => Promise<Koa.BaseResponse>,
) => Promise<void>;

type IHandlerLookup = {
  [prop in keyof IApiSegment]: koaRequestHandler;
};

export const formHandlerLookup: IHandlerLookup = {
  community: baseFormHandler(communityModule),
  builder: baseFormHandler(builderModule),
};

export const statusHandlerLookup: IHandlerLookup = {
  community: baseStatusHandler(communityModule),
  builder: baseStatusHandler(builderModule),
};

export const verifyHandlerLookup: IHandlerLookup = {
  community: baseVerifyHandler(communityModule),
  builder: baseVerifyHandler(builderModule),
};

export const routeToCorrectHandler =
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

/* The test below only works if unrelated code is commented out... */

/*
import 'reflect-metadata';
import { test, describe, expect } from 'vitest';

import { routeToCorrectHandler } from './routeLookup';
import { apiParams } from '../../constants/api';

describe('Route lookup', () => {
  describe('routeToCorrectHandler', () => {
    test('makeArrayOrDefault on undefined', async () => {
      let hasRun = false;
      const fakeDoNothing: any = () => {};
      const fakeCtx = {
        params: {
          [apiParams.general.segment]: 'builderTest',
        },
      };
      const fakeNextPromise = new Promise((res, _) => res(''));
      const routeFunctions: any = routeToCorrectHandler({
        communityTest: fakeDoNothing,
        builderTest: async () => {
          hasRun = true;
        },
      });
      await routeFunctions(fakeCtx, fakeNextPromise);
      expect(hasRun).toBeTruthy();
    });
  });
});


  */
