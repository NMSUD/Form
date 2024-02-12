import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Builder } from '@services/external/database/xata';
import { getApiFileService } from '@services/internal/apiFileService';
import { IGetImageForRecord } from 'data/contracts/image';

export const builderImgDownloader = async (
  props: IGetImageForRecord<Builder>,
): Promise<Builder> => {
  const persistence = { ...props.persistence };
  if (props.persistence.profilePicFile == null) return props.persistence;

  const profilePicFile = props.persistence.profilePicFile;
  const profilePicDownloadResult = await getApiFileService().downloadXataFile(
    profilePicFile,
    persistence.id,
    props.imagePath,
    'profile_pic',
  );
  if (profilePicDownloadResult.isSuccess) {
    persistence.profilePicFile = null;
    persistence.profilePicUrl = `${props.imgBaseUrl}/${props.imageFolder}/${profilePicDownloadResult.value}`;
  }

  persistence.approvalStatus = ApprovalStatus.approvedAndProcessed;
  const updatedRecordResult = await getDatabaseService()
    .builder()
    .update(persistence.id, persistence);
  if (updatedRecordResult.isSuccess == false) return props.persistence;

  return persistence;
};
