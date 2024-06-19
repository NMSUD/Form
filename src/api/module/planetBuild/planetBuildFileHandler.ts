import { handleImageFromFormData } from '@api/facade/handleImageFromFormData';
import { FormDataKey } from '@constants/form';
import { BioMediaImageSize, DefaultImageRestrictions } from '@constants/image';
import { IDatabaseFile } from '@contracts/databaseFile';
import { IFormWithFiles } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';

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
    const mediaFileResult = await handleImageFromFormData({
      fileFromForm: mediaFileFromForm,
      restrictions: DefaultImageRestrictions.bioMediaPic,
      fileName: 'mediaPic',
      handlerName: 'planetBuildFileHandler',
      ...BioMediaImageSize,
    });
    if (mediaFileResult.isSuccess == false) {
      continue;
    }
    result.mediaFiles.push(mediaFileResult.value);
  }

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
