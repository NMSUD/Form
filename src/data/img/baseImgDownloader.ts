import fs from 'fs';
import path from 'path';

import { IRecordRequirements } from '@api/module/baseModule';
import { getBotPath } from '@services/internal/configService';
import { IGetImageForRecord } from 'data/contracts/image';
import { IApiSegment } from '@constants/api';

interface IFetchImagesProps<T> {
  imageFolder: keyof IApiSegment;
  items: Array<T>;
  imgBaseUrl: string;
  processItem: (props: IGetImageForRecord<T>) => Promise<T>;
}

export const fetchImagesForTable = async <T extends IRecordRequirements>(
  props: IFetchImagesProps<T>,
): Promise<Array<T>> => {
  const imageFolder = `img/${props.imageFolder}`;
  const imagePath = path.join(getBotPath(), 'img', props.imageFolder);
  if (fs.existsSync(imagePath) == false) {
    fs.mkdirSync(imagePath);
  }

  const recordResult: Array<T> = [];
  for (const record of props.items) {
    const mappedRecord = await props.processItem({
      imageFolder: imageFolder,
      imagePath: imagePath,
      persistence: record,
      imgBaseUrl: props.imgBaseUrl,
    });
    recordResult.push(mappedRecord);
  }

  return recordResult;
};
