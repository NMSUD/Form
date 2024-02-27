import fs from 'fs';
import path from 'path';

import { IRecordRequirements } from '@api/types/baseModule';
import { getBotPath } from '@services/internal/configService';
import { IGetImageForRecord } from '../contracts/image';
import { IApiSegment } from '@constants/api';
import { ApprovalStatus } from '@constants/enum/approvalStatus';

interface IFetchImagesProps<T> {
  imageFolder: keyof IApiSegment;
  items: Array<T>;
  imgBaseUrl: string;
  processItemImgs: (props: IGetImageForRecord<T>) => Promise<T>;
}

export const fetchImagesForTable = async <T extends IRecordRequirements>(
  props: IFetchImagesProps<T>,
): Promise<Array<T>> => {
  const imageFolder = path.join(getBotPath(), 'img');
  if (fs.existsSync(imageFolder) == false) {
    fs.mkdirSync(imageFolder);
  }

  const imageSegmentFolder = `img/${props.imageFolder}`;
  const imagePath = path.join(getBotPath(), 'img', props.imageFolder);
  if (fs.existsSync(imagePath) == false) {
    fs.mkdirSync(imagePath);
  }

  const skipStatuses = [
    ApprovalStatus.pending,
    ApprovalStatus.changesNeeded,
    ApprovalStatus.denied,
  ];

  const recordResult: Array<T> = [];
  for (const record of props.items) {
    if (skipStatuses.includes(record.approvalStatus)) continue;

    const mappedRecord = await props.processItemImgs({
      imageFolder: imageSegmentFolder,
      imagePath: imagePath,
      persistence: record,
      imgBaseUrl: props.imgBaseUrl,
    });
    recordResult.push(mappedRecord);
  }

  return recordResult;
};
