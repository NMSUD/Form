import Koa from 'koa';

import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { getLog } from '@services/internal/logService';
import { IVerifyStatusParams } from '../../contracts/verifyStatusParam';
import { errorResponse } from '../../misc/httpResponse/errorResponse';
import { statusHandlerLookup } from '../lookupFunctions';

export const handleStatusRequest = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<Koa.BaseResponse>,
) => {
  const params: IVerifyStatusParams = {
    id: ctx.params[apiParams.status.id],
    segment: ctx.params[apiParams.status.segment],
  };
  getLog().i(`status-submission - ${params.id}`);

  const dbFunc = statusHandlerLookup[params.segment];
  if (dbFunc == null) {
    const errMsg = `Lookup failed for segment: ${params.segment}`;
    getLog().e(errMsg);
    await errorResponse({
      ctx,
      next,
      statusCode: ApiStatusErrorCode.segmentNotFound,
      message: errMsg,
    });
    return;
  }

  const recordResult = await dbFunc(params);

  ctx.response.status = 200;
  ctx.set('Content-Type', 'application/json');
  ctx.body = recordResult.value;

  await next();
};
