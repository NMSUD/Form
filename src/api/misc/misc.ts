import Koa from 'koa';

import { getVersionNumFromPackageJson } from '@helpers/fileHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { getConfig } from '@services/internal/configService';
import { isRequestAuthed } from '../guard/hasAuth';

export const defaultEndpoint = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<Koa.BaseResponse>,
) => {
  ctx.response.status = 303;
  ctx.redirect(getConfig().getNmsUdFormWebUrl());

  await next();
};

export const versionEndpoint =
  (authToken: string) => async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const isAdmin = await isRequestAuthed(
      authToken,
      ctx,
      () => new Promise((res) => res(anyObject)), // fake next, because we still want to do stuff if not authed
    );

    let output = `DOCKER_BUILD_VERSION: ${getConfig().buildVersion() ?? '???'}\n`;
    output += `packageVersion: ${getVersionNumFromPackageJson()}\n`;

    if (isAdmin) {
      output += '\nAuthenticate properties:\n\n';
      for (const processKey in process.env) {
        if (Object.prototype.hasOwnProperty.call(process.env, processKey)) {
          const element = process.env[processKey];
          output += `${processKey}: ${element}\n`;
        }
      }
    }

    ctx.body = output;

    await next();
  };
