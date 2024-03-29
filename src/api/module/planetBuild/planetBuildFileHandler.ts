import { processImageFromFormData } from '@api/facade/processImage';
import { FormDataKey } from '@constants/form';
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
  for (const mediaFileFromForm of makeArrayOrDefault(mediaFilesFromForm)) {
    const mediaDbBufferResult = await processImageFromFormData(mediaFileFromForm);
    if (mediaDbBufferResult.isSuccess == false) {
      getLog().e('planetBuildFileHandler bioMediaFileFromForm', mediaDbBufferResult.errorMessage);
      return {
        isSuccess: false,
        value: result,
        errorMessage: mediaDbBufferResult.errorMessage,
      };
    }

    if (result.mediaFiles == null) result.mediaFiles = [];
    result.mediaFiles.push(mediaDbBufferResult.value);
  }

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
