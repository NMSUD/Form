import Koa from 'koa';

import { IApiSegment } from '@constants/api';
import { IApiModule } from './baseModule';

export type koaRequestHandler = (
  ctx: Koa.DefaultContext,
  next: () => Promise<Koa.BaseResponse>,
) => Promise<void>;

export type IHandlerLookup = {
  [prop in keyof IApiSegment]: koaRequestHandler;
};
export type ModuleLookupType = {
  [prop in keyof IApiSegment]: IApiModule<any, any, any>;
};
