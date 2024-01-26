import 'reflect-metadata';
import { Container } from 'typedi';

import { setupKoa } from "./api/koa";
import { APP_TYPE, BOT_PATH } from './services/internal/configService';
import { AppType } from './constants/enum/appType';

const fs = require('fs');

require('dotenv').config();

const main = async () => {
    Container.set(BOT_PATH, __dirname);
    Container.set(APP_TYPE, AppType.DataGenerator);

    // Image download
    //      each table
    //          each each row
    //              if it has attachment(s)
    //                  download
    //                  edit row with imageUrl(s)

    // json generation
    //      json file for each table (e.g community.json)
    //      json file per id (e.g. for id "tester1" => community/tester1.json)




    // fetch all community data
    // each item

    // if (!fs.existsSync(fullDir)) {
    //     fs.mkdirSync(fullDir);
    // }
}

main();