import Koa from 'koa';

export const handleFormSubmission = async (ctx: Koa.DefaultContext, next: () => Promise<any>) => {
    ctx.body = `
    `;

    await next();
}