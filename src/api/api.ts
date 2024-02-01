import 'reflect-metadata';

import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import koaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'path';
import { Container } from 'typedi';

import { api } from '@constants/api';
import { AppType } from '@constants/enum/appType';
import { APP_TYPE, BOT_PATH, getBotPath, getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { versionEndpoint } from './misc/misc';
import {
  formHandlerLookup,
  routeToCorrectHandler,
  statusHandlerLookup,
  verifyHandlerLookup,
} from './routes/routeLookup';

Container.set(BOT_PATH, __dirname);
Container.set(APP_TYPE, AppType.Api);

const koa = new Koa();

getLog().i('Starting up http server');

const bodyOptions = koaBody({ multipart: true });
const router = new Router();

router.post(`/${api.routes.form}`, bodyOptions, routeToCorrectHandler(formHandlerLookup));
router.get(`/${api.routes.verify}`, routeToCorrectHandler(verifyHandlerLookup));
router.get(`/${api.routes.status}`, routeToCorrectHandler(statusHandlerLookup));

// misc
router.get('/version', versionEndpoint('secret'));

// middleware
koa.use(bodyParser());
koa.use(router.routes());
koa.use(serve(path.join(getBotPath(), '../public')));
koa.use(cors());

const port = getConfig().getApiPort();
koa.listen(port);

getLog().i(`Koa setup complete. Available on port ${port}\n`);
