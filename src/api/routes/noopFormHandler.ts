import Koa from 'koa';

import { getLog } from '@services/internal/logService';

export const noopFormHandler = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<Koa.BaseResponse>,
) => {
  const handlerName = `formHandler - not implemented yet`;
  getLog().i(handlerName);

  ctx.response.status = 200;
  ctx.set('Content-Type', 'application/json');

  await next();
};
