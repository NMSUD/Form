import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { PlanetBuild } from '@services/external/database/xata';
import { IProcessedRecord } from 'data/contracts/processedRecord';
import { IGetImageForRecord } from '../contracts/image';
import { getMediaImagesToDownload, imageListDownloader } from './logic/imageListDownloader';

export const planetBuildImgDownloader = async (
  props: IGetImageForRecord<PlanetBuild>,
): Promise<IProcessedRecord<PlanetBuild>> => {
  const persistence = { ...props.persistence };

  const mediaFiles = makeArrayOrDefault(props.persistence.mediaFiles);
  const listOfImagesToDownloadResult = getMediaImagesToDownload(
    props,
    mediaFiles,
    (mediaUrlString) => {
      persistence.mediaFiles = null;
      persistence.mediaUrls = mediaUrlString;
    },
  );

  await imageListDownloader(listOfImagesToDownloadResult.persistence);

  return {
    persistence,
    needsUpdating: listOfImagesToDownloadResult.needsUpdating,
  };
};
