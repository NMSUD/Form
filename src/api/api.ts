import 'reflect-metadata';

import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import { koaBody } from 'koa-body';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import { koaSwagger } from 'koa2-swagger-ui';
import path from 'path';
import { Container } from 'typedi';
import url from 'url';

import { api } from '@constants/api';
import { AppType } from '@constants/enum/appType';
import { APP_TYPE, BOT_PATH, getBotPath, getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { handleRouteLookup } from './handleRouteLookup';
import { defaultEndpoint, versionEndpoint } from './misc/misc';
import { baseFormHandler } from './routes/baseFormHandler';
import { baseStatusHandler } from './routes/baseStatusHandler';
import { baseVerifyHandler } from './routes/baseVerifyHandler';
import { baseFormHandlerSwagger } from './swagger/baseFormHandlerSwagger';
import { baseStatusHandlerSwagger } from './swagger/baseStatusHandlerSwagger';
import { baseVerifyHandlerSwagger } from './swagger/baseVerifyHandlerSwagger';
import { registerSwaggerStaticComponents } from './swagger/commonSwaggerOptions';
import { registerSwaggerModuleComponents } from './swagger/registerSwaggerModuleComponents';
import { SwaggerBuilder } from './swagger/swaggerBuilder';
import { versionSwagger } from './swagger/versionSwagger';
import { bugReportEndpoint } from './routes/bugReportEndpoint';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);

const main = async () => {
  Container.set(BOT_PATH, directory);
  Container.set(APP_TYPE, AppType.Api);

  const koa = new Koa();
  getLog().i('Starting up http server');

  const bodyOptions = koaBody({ multipart: true });
  const swaggerBuilder = new SwaggerBuilder();
  const router = new Router();

  router.get('/', defaultEndpoint);
  router.post(
    `/${api.routes.form}`,
    bodyOptions,
    handleRouteLookup({ handlerFunc: baseFormHandler }),
  );
  router.post(`/${api.routes.bugReport}`, bugReportEndpoint);
  router.get(`/${api.routes.verify}`, handleRouteLookup({ handlerFunc: baseVerifyHandler }));
  router.get(`/${api.routes.status}`, handleRouteLookup({ handlerFunc: baseStatusHandler }));
  router.get(`/${api.routes.version}`, versionEndpoint(getConfig().getApiSecret()));

  // Swagger
  registerSwaggerStaticComponents(swaggerBuilder);
  registerSwaggerModuleComponents({
    swaggerBuilder: swaggerBuilder,
  });
  baseFormHandlerSwagger({
    path: api.routes.form,
    method: 'post',
    swaggerBuilder: swaggerBuilder,
  });
  baseVerifyHandlerSwagger({
    path: api.routes.verify,
    method: 'get',
    swaggerBuilder: swaggerBuilder,
  });
  baseStatusHandlerSwagger({
    path: api.routes.status,
    method: 'get',
    swaggerBuilder: swaggerBuilder,
  });
  versionSwagger({
    path: api.routes.version,
    method: 'get',
    swaggerBuilder: swaggerBuilder,
  });

  // middleware
  koa.use(bodyParser());
  koa.use(router.routes());
  koa.use(serve(path.join(getBotPath(), '../../public')));
  koa.use(cors());
  koa.use(
    koaSwagger({
      title: 'NMSUD Form API',
      favicon: '/favicon.ico',
      routePrefix: '/swagger',
      swaggerOptions: { spec: swaggerBuilder.toSpec() },
      customCSS: swaggerBuilder.getCustomCss(),
    }),
  );

  const port = getConfig().getApiPort();
  koa.listen(port);

  getLog().i(`Koa setup complete. Available on port ${port}\n`);
};

main();
