import Koa from 'koa';

import { ApiStatusErrorCode, apiParams, segments } from '@constants/api';
import { IVerifyStatusParams, VerifyStatusFunc } from '../../contracts/verifyStatusParam';
import { getLog } from '@services/internal/logService';
import { errorResponse } from '../../misc/httpResponse/errorResponse';
import { handleCommunityStatusRequest } from './community/handleCommunityStatusRequest';

export const handleStatusRequest = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<Koa.BaseResponse>,
) => {
  const params: IVerifyStatusParams = {
    id: ctx.params[apiParams.status.id],
    segment: ctx.params[apiParams.status.segment],
  };
  getLog().i(`status-submission - ${params.id}`);

  const lookupFunctions: { [x: string]: VerifyStatusFunc } = {
    [segments.community]: handleCommunityStatusRequest,
  };

  const dbFunc = lookupFunctions[params.segment];
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
