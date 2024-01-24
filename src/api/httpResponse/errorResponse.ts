import Koa from 'koa';

export interface IErrorResponse {
    ctx: Koa.DefaultContext;
    next: () => Promise<any>;
    statusCode: number;
    message: string;
}

export const errorResponse = async (props: IErrorResponse) => {
    props.ctx.body = props.message;
    props.ctx.response.status = props.statusCode;
    props.ctx.set('Content-Type', 'application/json');
    await props.next();
}