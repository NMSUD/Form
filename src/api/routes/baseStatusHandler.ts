import Koa from 'koa';

import { IApiModule } from '@api/module/baseModule';
import { apiParams } from '@constants/api';
import { getLog } from '@services/internal/logService';

export const baseStatusHandler =
  <TD, TF, TP>(module: IApiModule<TD, TF, TP>) =>
  async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const name = `statusHandler-${module.name}`;
    getLog().i(name);

    const id = ctx.params[apiParams.status.id];
    const recordResult = await module.readRecord(id);
    if (recordResult.isSuccess == false) {
      const errMsg = `${name} - ${recordResult.errorMessage}`;
      getLog().e(errMsg);
      return;
    }

    const dto = module.mapPersistenceToDto(recordResult.value);
    const responseObj = {
      ...dto,
      approvalStatus: recordResult.value.approvalStatus,
    };

    ctx.response.status = 200;
    ctx.set('Content-Type', 'application/json');
    ctx.body = JSON.stringify(responseObj);

    await next();
  };
