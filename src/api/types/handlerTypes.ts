import Koa from 'koa';

import { IApiSegment } from '@constants/api';

export type koaRequestHandler = (
  ctx: Koa.DefaultContext,
  next: () => Promise<Koa.BaseResponse>,
) => Promise<void>;

export type IHandlerLookup = {
  [prop in keyof IApiSegment]: koaRequestHandler;
};
