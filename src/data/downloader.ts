import 'reflect-metadata';

import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import { Container } from 'typedi';

import { builderModule } from '@api/module/builder/builderModule';
import { communityModule } from '@api/module/community/communityModule';
import { AppType } from '@constants/enum/appType';
import { APP_TYPE, BOT_PATH } from '@services/internal/configService';
import { processTable } from './functions/processTable';
import { builderImgDownloader } from './img/builderImgDownloader';
import { communityImgDownloader } from './img/communityImgDownloader';
import { baseNoopEnhancer } from './mapper/baseMapper';
import { builderEnhancer } from './mapper/builderMapper';

const downloader = async () => {
  const dataFolder = path.join(__dirname, '../../data');
  Container.set(BOT_PATH, dataFolder);
  Container.set(APP_TYPE, AppType.DataGenerator);

  // without this, ts-node 💩s the bed
  const _ = prompts.toString();

  if (fs.existsSync(dataFolder) == false) {
    fs.mkdirSync(dataFolder);
  }

  await processTable({
    module: communityModule,
    processItemImgs: communityImgDownloader,
    dataEnhancer: baseNoopEnhancer,
  });

  await processTable({
    module: builderModule,
    processItemImgs: builderImgDownloader,
    dataEnhancer: builderEnhancer,
  });

  // json generation
  //      json file for each table (e.g community.json)
  //      json file per id (e.g. for id "tester1" => community/tester1.json)
  //      grouped json files (e.g. all builds by a builder with id "bobBuilder" => bases-by-builder/bobBuilder.json)
};

downloader();
