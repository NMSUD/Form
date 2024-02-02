import fs from 'fs';
import path from 'path';

import { IRecordRequirements } from '@api/module/baseModule';
import { getBotPath } from '@services/internal/configService';
import { IGetImageForRecord } from 'data/contracts/image';

interface IFetchImagesProps<T> {
  imageFolder: string;
  items: Array<T>;
  imgBaseUrl: string;
  processItem: (props: IGetImageForRecord<T>) => Promise<T>;
}

export const fetchImagesForTable = async <T extends IRecordRequirements>(
  props: IFetchImagesProps<T>,
): Promise<Array<T>> => {
  const imagePath = path.join(getBotPath(), props.imageFolder);
  if (fs.existsSync(imagePath) == false) {
    fs.mkdirSync(imagePath);
  }

  const recordResult: Array<T> = [];
  for (const record of props.items) {
    const mappedRecord = await props.processItem({
      imageFolder: imagePath,
      persistence: record,
      imgBaseUrl: props.imgBaseUrl,
    });
    recordResult.push(mappedRecord);
  }

  return recordResult;
};
