import 'reflect-metadata';
import { Container } from 'typedi';

import { setupKoa } from "./api/koa";
import { BOT_PATH } from './services/internal/configService';

require('dotenv').config();

const main = async () => {
    Container.set(BOT_PATH, __dirname);

    setupKoa();

    // setInterval(function () {
    //     console.log("timer that keeps nodejs processing running");
    // }, 1000 * 60 * 60);
}

main();