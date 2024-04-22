import fs from 'fs';
import path from 'path';

import { IRecordRequirements } from '@api/types/baseModule';
import { IApiSegment } from '@constants/api';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { Result } from '@contracts/resultWithValue';
import { getBotPath } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { IProcessedRecord } from 'data/contracts/processedRecord';
import { IGetImageForRecord } from '../contracts/image';

interface IFetchImagesProps<TP> {
  imageFolder: keyof IApiSegment;
  items: Array<TP>;
  imgBaseUrl: string;
  processItemImgs: (props: IGetImageForRecord<TP>) => Promise<IProcessedRecord<TP>>;
  updateItemInDb: (props: TP) => Promise<Result>;
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

  const allowedStatuses = [ApprovalStatus.approved, ApprovalStatus.approvedAndProcessed];

  const recordResult: Array<T> = [];
  for (const record of props.items) {
    if (allowedStatuses.includes(record.approvalStatus) === false) continue;

    const mappedRecord = await props.processItemImgs({
      imageFolder: imageSegmentFolder,
      imagePath: imagePath,
      persistence: record,
      imgBaseUrl: props.imgBaseUrl,
    });

    if (mappedRecord.persistence.approvalStatus !== ApprovalStatus.approvedAndProcessed) {
      mappedRecord.persistence.approvalStatus = ApprovalStatus.approvedAndProcessed;
    }

    if (mappedRecord.needsUpdating) {
      getLog().i(`record ${mappedRecord.persistence.id} needs updating`);
      const updatedRecordResult = await props.updateItemInDb(mappedRecord.persistence);
      if (updatedRecordResult.isSuccess === false) {
        const errMsg = `Error occurred while updating a processed record: ${updatedRecordResult.errorMessage}`;
        getLog().e(errMsg);
      }
    }

    recordResult.push(mappedRecord.persistence);
  }

  return recordResult;
};
