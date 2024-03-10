import 'reflect-metadata';

import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import koaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import { koaSwagger } from 'koa2-swagger-ui';
import path from 'path';
import { Container } from 'typedi';

import { api } from '@constants/api';
import { AppType } from '@constants/enum/appType';
import { APP_TYPE, BOT_PATH, getBotPath, getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { handleRouteLookup } from './handleRouteLookup';
import { versionEndpoint } from './misc/misc';
import { baseFormHandler } from './routes/baseFormHandler';
import { baseStatusHandler } from './routes/baseStatusHandler';
import { baseVerifyHandler } from './routes/baseVerifyHandler';
import { baseFormHandlerSwagger } from './swagger/baseFormHandlerSwagger';
import { baseStatusHandlerSwagger } from './swagger/baseStatusHandlerSwagger';
import { baseVerifyHandlerSwagger } from './swagger/baseVerifyHandlerSwagger';
import { registerSwaggerModuleComponents } from './swagger/registerSwaggerModuleComponents';
import { SwaggerBuilder } from './utils/swagger';
import { registerSwaggerStaticComponents } from './swagger/registerSwaggerStaticComponents';
import { versionSwagger } from './swagger/versionSwagger';

Container.set(BOT_PATH, __dirname);
Container.set(APP_TYPE, AppType.Api);

const koa = new Koa();
getLog().i('Starting up http server');

const bodyOptions = koaBody({ multipart: true });
const swaggerBuilder = new SwaggerBuilder();
const router = new Router();

router.post(
  `/${api.routes.form}`,
  bodyOptions,
  handleRouteLookup({ handlerFunc: baseFormHandler }),
);
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
koa.use(serve(path.join(getBotPath(), '../public')));
koa.use(cors());
koa.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: { spec: swaggerBuilder.toSpec() },
    customCSS: swaggerBuilder.getCustomCss(),
  }),
);

const port = getConfig().getApiPort();
koa.listen(port);

getLog().i(`Koa setup complete. Available on port ${port}\n`);
