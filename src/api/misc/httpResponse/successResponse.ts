import { IFormResponse } from '@contracts/response/formResponse';
import Koa from 'koa';

export interface ISuccessResponse<T> {
  ctx: Koa.DefaultContext;
  body: IFormResponse;
  next: () => Promise<unknown>;
}

export const successResponse = async <T>(props: ISuccessResponse<T>) => {
  props.ctx.response.status = 200;
  props.ctx.set('Content-Type', 'application/json');
  props.ctx.body = props.body;

  await props.next();
};
