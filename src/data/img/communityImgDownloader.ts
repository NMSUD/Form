import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Community } from '@services/external/database/xata';
import { getApiFileService } from '@services/internal/apiFileService';
import { IGetImageForRecord } from 'data/contracts/image';

export const communityImgDownloader = async (
  props: IGetImageForRecord<Community>,
): Promise<Community> => {
  let numFilesDownloaded = 0;
  const persistence = { ...props.persistence };
  if (props.persistence.profilePicFile == null) return props.persistence;

  const profilePicFile = props.persistence.profilePicFile;
  const profilePicDownloadResult = await getApiFileService().downloadXataFile(
    profilePicFile,
    persistence.id,
    props.imageFolder,
    'profile_pic',
  );
  if (profilePicDownloadResult.isSuccess) {
    persistence.profilePicFile = null;
    persistence.profilePicUrl = `${props.imgBaseUrl}/${profilePicDownloadResult.value}`;
    numFilesDownloaded++;
  }

  const bioMediaUrls: Array<string> = [];
  const bioMediaFiles = makeArrayOrDefault(props.persistence.bioMediaFiles);
  for (let bioMediaIndex = 0; bioMediaIndex < bioMediaFiles.length; bioMediaIndex++) {
    const bioMedia = bioMediaFiles[bioMediaIndex];
    if (bioMedia == null) continue;

    const bioMediaDownloadResult = await getApiFileService().downloadXataFile(
      bioMedia,
      persistence.id,
      props.imageFolder,
      `bio_media_${bioMediaIndex + 1}`,
    );
    if (bioMediaDownloadResult.isSuccess) {
      bioMediaUrls.push(`${props.imgBaseUrl}/${bioMediaDownloadResult.value}`);
      persistence.bioMediaFiles = null;
      persistence.bioMediaUrls = bioMediaUrls.join(',');
      numFilesDownloaded++;
    }
  }

  const updatedRecordResult = await getDatabaseService()
    .community()
    .update(persistence.id, persistence);
  if (updatedRecordResult.isSuccess == false) return props.persistence;

  return persistence;
};
