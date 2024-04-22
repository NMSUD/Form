import 'reflect-metadata';

import fs from 'fs';
import path from 'path';
import { Container } from 'typedi';
import url from 'url';

import { builderModule } from '@api/module/builder/builderModule';
import { communityModule } from '@api/module/community/communityModule';
import { AppType } from '@constants/enum/appType';
import { getDatabaseService } from '@services/external/database/databaseService';
import { APP_TYPE, BOT_PATH } from '@services/internal/configService';
import { processTable } from './functions/processTable';
import { builderImgDownloader } from './img/builderImgDownloader';
import { communityImgDownloader } from './img/communityImgDownloader';
import { builderEnhancer } from './mapper/builderMapper';
import { communityEnhancer } from './mapper/communityMapper';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);

const downloader = async () => {
  const dataFolder = path.join(directory, '../../data');
  Container.set(BOT_PATH, dataFolder);
  Container.set(APP_TYPE, AppType.DataGenerator);

  if (fs.existsSync(dataFolder) == false) {
    fs.mkdirSync(dataFolder);
  }

  await processTable({
    module: communityModule,
    processItemImgs: communityImgDownloader,
    updateItemInDb: (p) => getDatabaseService().community().update(p.id, p),
    dataEnhancer: communityEnhancer,
  });

  await processTable({
    module: builderModule,
    processItemImgs: builderImgDownloader,
    updateItemInDb: (p) => getDatabaseService().builder().update(p.id, p),
    dataEnhancer: builderEnhancer,
  });

  // json generation
  //      json file for each table (e.g community.json)
  //      json file per id (e.g. for id "tester1" => community/tester1.json)
  //      grouped json files (e.g. all builds by a builder with id "bobBuilder" => bases-by-builder/bobBuilder.json)
};

downloader();
