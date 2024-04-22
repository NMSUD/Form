import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { imgFileName } from '@constants/file';
import { Builder } from '@services/external/database/xata';
import { getLog } from '@services/internal/logService';
import { IProcessedRecord } from 'data/contracts/processedRecord';
import { IGetImageForRecord } from '../contracts/image';
import { IImageDownloadRequest, imageListDownloader } from './imageListDownloader';

export const builderImgDownloader = async (
  props: IGetImageForRecord<Builder>,
): Promise<IProcessedRecord<Builder>> => {
  const listOfImagesToDownload: Array<IImageDownloadRequest> = [];
  const persistence = { ...props.persistence };
  let needsUpdating: boolean = false;

  let profilePicFileUrl: string | null | undefined = props.persistence.profilePicFile?.url;
  if (persistence.approvalStatus === ApprovalStatus.approvedAndProcessed) {
    profilePicFileUrl = persistence.profilePicUrl;
  }
  listOfImagesToDownload.push({
    fileName: imgFileName.profilePic(persistence.id),
    folder: props.imagePath,
    url: profilePicFileUrl,
    onSuccess: (newFileName: string) => {
      getLog().i(`\t\tDownloaded ${newFileName}`);
      const newProfilePicUrl = `${props.imgBaseUrl}/${props.imageFolder}/${newFileName}`;
      if (persistence.profilePicUrl != newProfilePicUrl) {
        persistence.profilePicFile = null;
        persistence.profilePicUrl = newProfilePicUrl;
        needsUpdating = true;
      }
    },
  });

  await imageListDownloader(listOfImagesToDownload);

  return {
    persistence,
    needsUpdating,
  };
};
