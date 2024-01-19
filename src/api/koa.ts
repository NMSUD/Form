import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from "koa-static";

import { getConfig } from '../services/internal/configService';
import { getLog } from "../services/internal/logService";
import { defaultEndpoint, versionEndpoint } from './misc';
import { handleFormSubmission } from './form';

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

    // route definitions
    const router = new Router();
    router.get('/version', versionEndpoint('secret'));
    router.post('/', handleFormSubmission);

    props.koa.use(bodyParser());
    props.koa.use(router.routes());
    props.koa.use(serve('public'));
    props.koa.use(cors());

    const port = getConfig().getApiPort();
    props.koa.listen(port);

    getLog().i(`Http server setup complete. Available at http://localhost:${port}\n`);

    return props.koa;
}
