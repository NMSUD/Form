import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { imgFileName } from '@constants/file';
import { getApiFileService } from '@services/internal/apiFileService';
import { getLog } from '@services/internal/logService';
import { XataArrayFile, XataFile } from '@xata.io/client';
import { IGetImageForRecord } from 'data/contracts/image';
import { IProcessedRecord } from 'data/contracts/processedRecord';

export interface IImageDownloadRequest {
  url?: string | null;
  folder: string;
  fileName: string;
  onSuccess: (imgPath: string) => void;
}
export const imageListDownloader = async (imagesToDownload: Array<IImageDownloadRequest>) => {
  for (const imgToDownload of imagesToDownload) {
    if (imgToDownload.url == null) continue;
    const imgDownloadResult = await getApiFileService().downloadFileFromUrl(
      imgToDownload.url,
      imgToDownload.folder,
      imgToDownload.fileName,
    );
    if (imgDownloadResult.isSuccess) {
      imgToDownload.onSuccess(imgDownloadResult.value);
    }
  }
};

interface IRequiredForProfilePicToDownload {
  id: string;
  profilePicUrl?: string | null | undefined;
  approvalStatus: ApprovalStatus;
}
export const getProfilePicToDownload = <TP>(
  record: IGetImageForRecord<TP & IRequiredForProfilePicToDownload>,
  mediaFile: XataFile | null | undefined,
  onNeedsUpdating: (profilePicUrl: string) => void,
): IProcessedRecord<Array<IImageDownloadRequest>> => {
  const listOfImagesToDownload: Array<IImageDownloadRequest> = [];
  let needsUpdating: boolean = false;

  let profilePicFileUrl: string | null | undefined = mediaFile?.url;
  if (record.persistence.approvalStatus === ApprovalStatus.approvedAndProcessed) {
    profilePicFileUrl = record.persistence.profilePicUrl;
  }
  listOfImagesToDownload.push({
    fileName: imgFileName.profilePic(record.persistence.id),
    folder: record.imagePath,
    url: profilePicFileUrl,
    onSuccess: (newFileName: string) => {
      getLog().i(`\t\tDownloaded ${newFileName}`);
      const newProfilePicUrl = `${record.imgBaseUrl}/${record.imageFolder}/${newFileName}`;
      if (record.persistence.profilePicUrl != newProfilePicUrl) {
        onNeedsUpdating(newProfilePicUrl);
        needsUpdating = true;
      }
    },
  });

  return {
    persistence: listOfImagesToDownload,
    needsUpdating,
  };
};

export const getMediaImagesToDownload = <TP>(
  record: IGetImageForRecord<TP & { id: string }>,
  mediaFiles: Array<XataArrayFile | null>,
  onNeedsUpdating: (mediaUrlString: string) => void,
): IProcessedRecord<Array<IImageDownloadRequest>> => {
  const listOfImagesToDownload: Array<IImageDownloadRequest> = [];
  let needsUpdating: boolean = false;

  const mediaUrls: Array<string> = [];
  for (let mediaIndex = 0; mediaIndex < mediaFiles.length; mediaIndex++) {
    const media = mediaFiles[mediaIndex];
    if (media == null) continue;
    if (media.url == null) continue;

    listOfImagesToDownload.push({
      fileName: imgFileName.bioMediaUrls(record.persistence.id, mediaIndex + 1),
      folder: record.imagePath,
      url: media.url,
      onSuccess: (newFileName: string) => {
        getLog().i(`\t\tDownloaded ${newFileName}`);
        const newMediaUrl = `${record.imgBaseUrl}/${record.imageFolder}/${newFileName}`;
        mediaUrls.push(newMediaUrl);

        if (mediaUrls.includes(newMediaUrl) === false) {
          onNeedsUpdating(mediaUrls.join(','));
          needsUpdating = true;
        }
      },
    });
  }

  return {
    persistence: listOfImagesToDownload,
    needsUpdating,
  };
};
