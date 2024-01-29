import 'reflect-metadata';
import { Container } from 'typedi';
import fs from 'fs';
import path from 'path';

import { APP_TYPE, BOT_PATH } from './services/internal/configService';
import { AppType } from './constants/enum/appType';

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
    //      grouped json files (e.g. all builds by a builder with id "bobBuilder" => bases-by-builder/bobBuilder.json)




    // fetch all community data
    // each item

    // if (!fs.existsSync(fullDir)) {
    //     fs.mkdirSync(fullDir);
    // }
}

main();