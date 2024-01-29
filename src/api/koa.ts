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
import { versionEndpoint } from './misc';

export const setupKoa = () => {
    const koa = new Koa();
    setUpCustomHttpServer({ koa });

    getLog().i('Koa setup complete\n');
}

interface IHttpServerProps {
    koa: Koa;
}

export const setUpCustomHttpServer = (props: IHttpServerProps) => {
    getLog().i("Starting up http server");

    const bodyOptions = koaBody({ multipart: true });
    const router = new Router();
    // router.get('/', defaultEndpoint);
    router.get('/version', versionEndpoint('secret'));

    // forms
    router.post('/' + api.routes.form.community, bodyOptions, handleCommunityFormSubmission);
    router.post('/' + api.routes.form.builder, bodyOptions, handleBuilderFormSubmission);
    // router.post(api.routes.form.baseBuild, handleFormSubmission);

    // middleware
    props.koa.use(bodyParser());
    props.koa.use(router.routes());
    props.koa.use(serve(path.join(getBotPath(), '../public')));
    props.koa.use(cors());

    const port = getConfig().getApiPort();
    props.koa.listen(port);

    getLog().i(`Http server setup complete. Available at http://localhost:${port}\n`);

    return props.koa;
}
