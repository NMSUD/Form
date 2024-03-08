import Koa from 'koa';

import { errorResponse } from '@api/misc/httpResponse/errorResponse';
import { ModuleLookupType, koaRequestHandler } from '@api/types/handlerTypes';
import { ApiStatusErrorCode, IApiSegment, apiParams } from '@constants/api';
import { getLog } from '@services/internal/logService';
import { moduleLookup } from './module/moduleLookup';
import { IApiModule } from './types/baseModule';

export const handleRouteLookup =
  (props: {
    module?: ModuleLookupType;
    handlerFunc: (module: IApiModule<any, any, any>) => koaRequestHandler;
  }) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const segment = ctx.params[apiParams.general.segment];
    const innerModuleLookup = props.module ?? moduleLookup;
    const module = innerModuleLookup[segment as keyof IApiSegment];
    if (module == null) {
      const errMsg = `Correct route not found for ${segment}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.segmentNotFound.code,
        message: errMsg,
      });
      return;
    }

    const handler = props.handlerFunc(module);
    await handler(ctx, next);
  };
