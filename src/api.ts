import 'reflect-metadata';
import { Container } from 'typedi';

import { setupKoa } from './api/koa';
import { APP_TYPE, BOT_PATH } from './services/internal/configService';
import { AppType } from './constants/enum/appType';

require('dotenv').config();

const main = async () => {
    Container.set(BOT_PATH, __dirname);
    Container.set(APP_TYPE, AppType.Api);

    setupKoa();

    // setInterval(function () {
    //     console.log("timer that keeps nodejs processing running");
    // }, 1000 * 60 * 60);
}

main();