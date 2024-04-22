import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { imgFileName } from '@constants/file';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { Community } from '@services/external/database/xata';
import { getLog } from '@services/internal/logService';
import { IProcessedRecord } from 'data/contracts/processedRecord';
import { IGetImageForRecord } from '../contracts/image';
import { IImageDownloadRequest, imageListDownloader } from './imageListDownloader';

export const communityImgDownloader = async (
  props: IGetImageForRecord<Community>,
): Promise<IProcessedRecord<Community>> => {
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

  const bioMediaUrls: Array<string> = [];
  const bioMediaFiles = makeArrayOrDefault(props.persistence.bioMediaFiles);
  for (let bioMediaIndex = 0; bioMediaIndex < bioMediaFiles.length; bioMediaIndex++) {
    const bioMedia = bioMediaFiles[bioMediaIndex];
    if (bioMedia == null) continue;

    listOfImagesToDownload.push({
      fileName: imgFileName.bioMediaUrls(persistence.id, bioMediaIndex + 1),
      folder: props.imagePath,
      url: profilePicFileUrl,
      onSuccess: (newFileName: string) => {
        getLog().i(`\t\tDownloaded ${newFileName}`);
        const newBioMediaUrl = `${props.imgBaseUrl}/${props.imageFolder}/${newFileName}`;
        bioMediaUrls.push(newBioMediaUrl);

        if (persistence.bioMediaUrls.includes(newBioMediaUrl) === false) {
          persistence.bioMediaFiles = null;
          persistence.bioMediaUrls = bioMediaUrls.join(',');
          needsUpdating = true;
        }
      },
    });
  }

  await imageListDownloader(listOfImagesToDownload);

  return {
    persistence,
    needsUpdating,
  };
};
