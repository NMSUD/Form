import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { Community } from '@services/external/database/xata';
import { IGetImageForRecord } from 'data/contracts/image';
import { IImageDownloadRequest, imageListDownloader } from './imageListDownloader';
import { getLog } from '@services/internal/logService';

export const communityImgDownloader = async (
  props: IGetImageForRecord<Community>,
): Promise<Community> => {
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

  const bioMediaUrls: Array<string> = [];
  const bioMediaFiles = makeArrayOrDefault(props.persistence.bioMediaFiles);
  for (let bioMediaIndex = 0; bioMediaIndex < bioMediaFiles.length; bioMediaIndex++) {
    const bioMedia = bioMediaFiles[bioMediaIndex];
    if (bioMedia == null) continue;

    listOfImagesToDownload.push({
      fileName: `${persistence.id}_bio_media_${bioMediaIndex + 1}.png`,
      folder: props.imagePath,
      url: profilePicFileUrl,
      onSuccess: (newFileName: string) => {
        getLog().i(`\t\tDownloaded ${newFileName}`);
        bioMediaUrls.push(`${props.imgBaseUrl}/${props.imageFolder}/${newFileName}`);
        persistence.bioMediaFiles = null;
        persistence.bioMediaUrls = bioMediaUrls.join(',');
      },
    });
  }

  await imageListDownloader(listOfImagesToDownload);

  if (persistence.approvalStatus === ApprovalStatus.approvedAndProcessed) {
    return persistence;
  }

  // persistence.approvalStatus = ApprovalStatus.approvedAndProcessed;
  // const updatedRecordResult = await getDatabaseService()
  //   .community()
  //   .update(persistence.id, persistence);
  // if (updatedRecordResult.isSuccess == false) return props.persistence;

  return persistence;
};
