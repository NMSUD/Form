import { processImageFromFormData } from '@api/facade/processImage';
import { FormDataKey } from '@constants/form';
import { BioMediaImageSize } from '@constants/image';
import { IDatabaseFile } from '@contracts/databaseFile';
import { IFormWithFiles } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { getLog } from '@services/internal/logService';

export interface IPlanetBuildImages {
  mediaFiles?: Array<IDatabaseFile>;
}

export const planetBuildFileHandler = async (
  formData: IFormWithFiles,
): Promise<ResultWithValue<IPlanetBuildImages>> => {
  const result: IPlanetBuildImages = {
    mediaFiles: [],
  };

  const mediaFilesFromForm = formData[FormDataKey.mediaFiles];
  if (result.mediaFiles == null) result.mediaFiles = [];
  for (const mediaFileFromForm of makeArrayOrDefault(mediaFilesFromForm)) {
    const mediaDbBufferResult = await processImageFromFormData({
      fileFromForm: mediaFileFromForm,
      ...BioMediaImageSize,
    });
    if (mediaDbBufferResult.isSuccess == false) {
      getLog().e('planetBuildFileHandler bioMediaFileFromForm', mediaDbBufferResult.errorMessage);
    }

    result.mediaFiles.push(mediaDbBufferResult.value);
  }

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
