import Koa from 'koa';

import { IApiModule } from '@api/module/baseModule';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { getLog } from '@services/internal/logService';
import { IFormWithApprovalResponse } from '@contracts/response/formResponse';
import { errorResponse } from '@api/misc/httpResponse/errorResponse';

export const baseStatusHandler =
  <TD, TF, TP>(module: IApiModule<TD, TF, TP>) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const id = ctx.params[apiParams.status.id];
    const handlerName = `statusHandler ${module.name} ${id}`;

    const recordResult = await module.readRecord(id);
    if (recordResult.isSuccess == false) {
      const errMsg = `${handlerName}: ${recordResult.errorMessage}`;
      getLog().e(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.recordNotFound,
        message: errMsg,
      });
      return;
    }

    // const dto = module.mapPersistenceToDto(recordResult.value);
    const responseObj: IFormWithApprovalResponse = {
      id: recordResult.value.id,
      name: module.getName(recordResult.value),
      iconUrl: module.getIcon?.(recordResult.value) ?? undefined,
      approvalStatus: recordResult.value.approvalStatus,
    };

    ctx.response.status = 200;
    ctx.set('Content-Type', 'application/json');
    ctx.body = JSON.stringify(responseObj);

    await next();
  };
