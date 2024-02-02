import 'reflect-metadata';
import { Container } from 'typedi';
import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

import { APP_TYPE, BOT_PATH, getConfig } from '@services/internal/configService';
import { AppType } from '@constants/enum/appType';
import { getLog } from '@services/internal/logService';
import { communityModule } from '@api/module/community/communityModule';
import { fetchImagesForTable } from './img/baseImgDownloader';
import { communityImgDownloader } from './img/communityImgDownloader';

const interactive = async () => {
  const dataFolder = path.join(__dirname, '../../data');
  Container.set(BOT_PATH, dataFolder);
  Container.set(APP_TYPE, AppType.DataGenerator);

  // without this, ts-node 💩s the bed
  const _ = prompts.toString();

  if (fs.existsSync(dataFolder) == false) {
    fs.mkdirSync(dataFolder);
  }

  const folderAndFiles = {
    community: {
      allItems: 'community.json',
      folder: 'community',
      itemTemplate: '{0}.json',
    },
  };

  getLog().i('Fetching all the data');
  const commuityTableResult = await communityModule.readAllRecords();
  if (commuityTableResult.isSuccess == false) return throwError(commuityTableResult.errorMessage);

  getLog().i('Fetch images per record');
  const updatedCommunityTable = await fetchImagesForTable({
    items: commuityTableResult.value,
    imageFolder: folderAndFiles.community.folder,
    imgBaseUrl: getConfig().getNmsUdBaseImgUrl(),
    processItem: communityImgDownloader,
  });

  // getLog().i('Writing base jsonFiles');
  // generateJsonFile({
  //   items: mappedCommunityTable,
  //   outputFile: folderAndFiles.community.allItems,
  // });

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
};

interactive();

const throwError = (errMsg: string) => {
  console.error(errMsg);
};
