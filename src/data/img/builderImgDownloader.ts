import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Builder } from '@services/external/database/xata';
import { getLog } from '@services/internal/logService';
import { IGetImageForRecord } from '../contracts/image';
import { IImageDownloadRequest, imageListDownloader } from './imageListDownloader';

export const builderImgDownloader = async (
  props: IGetImageForRecord<Builder>,
): Promise<Builder> => {
  const listOfImagesToDownload: Array<IImageDownloadRequest> = [];
  const persistence = { ...props.persistence };

  let profilePicFileUrl: string | null | undefined = props.persistence.profilePicFile?.url;
  if (persistence.approvalStatus === ApprovalStatus.approvedAndProcessed) {
    profilePicFileUrl = persistence.profilePicUrl;
  }
  listOfImagesToDownload.push({
    fileName: `${persistence.id}_profile_pic.png`,
    folder: props.imagePath,
    url: profilePicFileUrl,
    onSuccess: (newFileName: string) => {
      getLog().i(`\t\tDownloaded ${newFileName}`);
      persistence.profilePicFile = null;
      persistence.profilePicUrl = `${props.imgBaseUrl}/${props.imageFolder}/${newFileName}`;
    },
  });

  await imageListDownloader(listOfImagesToDownload);

  if (persistence.approvalStatus === ApprovalStatus.approvedAndProcessed) {
    return persistence;
  }

  persistence.approvalStatus = ApprovalStatus.approvedAndProcessed;
  const updatedRecordResult = await getDatabaseService()
    .builder()
    .update(persistence.id, persistence);
  if (updatedRecordResult.isSuccess == false) return props.persistence;

  return persistence;
};
