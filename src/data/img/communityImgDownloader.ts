import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { Community } from '@services/external/database/xata';
import { IProcessedRecord } from 'data/contracts/processedRecord';
import { IGetImageForRecord } from '../contracts/image';
import {
  getMediaImagesToDownload,
  getProfilePicToDownload,
  imageListDownloader,
} from './logic/imageListDownloader';

export const communityImgDownloader = async (
  props: IGetImageForRecord<Community>,
): Promise<IProcessedRecord<Community>> => {
  const persistence = { ...props.persistence };

  const profileImageToDownloadObj = getProfilePicToDownload(
    props,
    props.persistence.profilePicFile,
    (mediaUrlString) => {
      persistence.profilePicFile = null;
      persistence.profilePicUrl = mediaUrlString;
    },
  );

  const bioMediaFiles = makeArrayOrDefault(props.persistence.bioMediaFiles);
  const bioMediaImagesToDownloadObj = getMediaImagesToDownload(
    props,
    bioMediaFiles,
    (mediaUrlString) => {
      persistence.bioMediaFiles = null;
      persistence.bioMediaUrls = mediaUrlString;
    },
  );

  await imageListDownloader([
    ...profileImageToDownloadObj.persistence,
    ...bioMediaImagesToDownloadObj.persistence,
  ]);

  return {
    persistence,
    needsUpdating:
      profileImageToDownloadObj.needsUpdating || //
      bioMediaImagesToDownloadObj.needsUpdating,
  };
};
