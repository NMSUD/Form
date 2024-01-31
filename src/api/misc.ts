import Koa from 'koa';

import { version } from '../../package.json';
import { getConfig } from '../services/internal/configService';
import { isRequestAuthed } from './guard/hasAuth';


export const defaultEndpoint = async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    ctx.body = '<p>You should <b>not</b> be here... Well done I guess 🤔</p>';

    await next();
}

export const versionEndpoint = (authToken: string) => async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const isAdmin = await isRequestAuthed(authToken, ctx, next);

    let output = `DOCKER_BUILD_VERSION: ${getConfig().buildVersion() ?? '???'}\n`;
    output += `packageVersion: ${version ?? '???'}\n`;
    output += '\nAuthenticate properties:\n\n';

    if (isAdmin) {
        for (const processKey in process.env) {
            if (Object.prototype.hasOwnProperty.call(process.env, processKey)) {
                const element = process.env[processKey];
                output += `${processKey}: ${element}\n`;
            }
        }
    }

    ctx.body = output;

    await next();
}