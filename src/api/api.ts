import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import koaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'path';
import 'reflect-metadata';
import { Container } from 'typedi';

import { handleBuilderFormSubmission } from '@api/routes/form/builderForm';
import { handleCommunityFormSubmission } from '@api/routes/form/communityForm';
import { handleStatusRequest } from '@api/routes/status/handleStatusRequest';
import { handleVerifyRequest } from '@api/routes/verify/handleVerifyRequest';
import { api } from '@constants/api';
import { AppType } from '@constants/enum/appType';
import { APP_TYPE, BOT_PATH, getBotPath, getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { versionEndpoint } from './misc/misc';

require('dotenv').config();

Container.set(BOT_PATH, __dirname);
Container.set(APP_TYPE, AppType.Api);

const koa = new Koa();

getLog().i('Starting up http server');

const bodyOptions = koaBody({ multipart: true });
const router = new Router();

// forms
router.post(`/${api.routes.form.community}`, bodyOptions, handleCommunityFormSubmission);
router.post(`/${api.routes.form.builder}`, bodyOptions, handleBuilderFormSubmission);
// router.post(api.routes.form.baseBuild, handleFormSubmission);

// verify
router.get(`/${api.routes.verify}`, handleVerifyRequest);
router.get(`/${api.routes.status}`, handleStatusRequest);

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
