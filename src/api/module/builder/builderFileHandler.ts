import { processImageFromFormData } from '@api/facade/processImage';
import { FormDataKey } from '@constants/form';
import { IDatabaseFile } from '@contracts/databaseFile';
import { IFormWithFiles } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { getLog } from '@services/internal/logService';

export interface IBuilderImages {
  profilePicFile?: IDatabaseFile;
  bioMediaFiles?: Array<IDatabaseFile>;
}

export const builderFileHandler = async (
  formData: IFormWithFiles,
): Promise<ResultWithValue<IBuilderImages>> => {
  const result: IBuilderImages = {
    bioMediaFiles: [],
  };

  const profilePicFileFromForm = formData[FormDataKey.profilePicFile];
  const resizedProfilePicResult = await processImageFromFormData(profilePicFileFromForm);
  if (resizedProfilePicResult.isSuccess == false) {
    getLog().e('handleBuilderFormSubmission profilePicFileFromForm', resizedProfilePicResult.value);
    return {
      isSuccess: false,
      value: result,
      errorMessage: resizedProfilePicResult.errorMessage,
    };
  }
  result.profilePicFile = resizedProfilePicResult.value;

  const bioMediaFilesFromForm = formData[FormDataKey.bioMediaFiles];
  if (result.bioMediaFiles == null) result.bioMediaFiles = [];
  for (const bioMediaFileFromForm of makeArrayOrDefault(bioMediaFilesFromForm)) {
    const bioMediaDbBufferResult = await processImageFromFormData(bioMediaFileFromForm);
    if (bioMediaDbBufferResult.isSuccess == false) {
      getLog().e(
        'handleBuilderFormSubmission bioMediaFileFromForm',
        bioMediaDbBufferResult.errorMessage,
      );
    }

    result.bioMediaFiles.push(bioMediaDbBufferResult.value);
  }

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
