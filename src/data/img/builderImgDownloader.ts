import { Builder } from '@services/external/database/xata';
import { IProcessedRecord } from 'data/contracts/processedRecord';
import { IGetImageForRecord } from '../contracts/image';
import { getProfilePicToDownload, imageListDownloader } from './logic/imageListDownloader';

export const builderImgDownloader = async (
  props: IGetImageForRecord<Builder>,
): Promise<IProcessedRecord<Builder>> => {
  const persistence = { ...props.persistence };

  const profileImageToDownloadObj = getProfilePicToDownload(
    props,
    props.persistence.profilePicFile,
    (mediaUrlString) => {
      persistence.profilePicFile = null;
      persistence.profilePicUrl = mediaUrlString;
    },
  );

  await imageListDownloader([
    ...profileImageToDownloadObj.persistence, //
  ]);

  return {
    persistence,
    needsUpdating: profileImageToDownloadObj.needsUpdating,
  };
};
