import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaBody from 'koa-body';
import serve from 'koa-static';
import path from 'path';

import { api } from '../constants/api';
import { getBotPath, getConfig } from '../services/internal/configService';
import { getLog } from '../services/internal/logService';
import { handleBuilderFormSubmission } from './form/builderForm';
import { handleCommunityFormSubmission } from './form/communityForm';
import { handleVerifyRequest } from './verify/handleVerifyRequest';
import { handleStatusRequest } from './status/handleStatusRequest';
import { versionEndpoint } from './misc';

export const setupKoa = () => {
    const koa = new Koa();

    getLog().i("Starting up http server");

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
}
