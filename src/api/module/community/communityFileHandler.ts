import { processImageFromFormData } from '@api/facade/processImage';
import { FormDataKey } from '@constants/form';
import { IDatabaseFile } from '@contracts/databaseFile';
import { IFormWithFiles } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { getLog } from '@services/internal/logService';

export interface ICommunityImages {
  profilePicFile?: IDatabaseFile;
  bioMediaFiles?: Array<IDatabaseFile>;
}

export const communityFileHandler = async (
  formData: IFormWithFiles,
): Promise<ResultWithValue<ICommunityImages>> => {
  const result: ICommunityImages = {
    bioMediaFiles: [],
  };

  const profilePicFileFromForm = formData[FormDataKey.profilePicFile];
  const resizedProfilePicResult = await processImageFromFormData(profilePicFileFromForm);
  if (resizedProfilePicResult.isSuccess == false) {
    getLog().e(
      'handleCommunityFormSubmission profilePicFileFromForm',
      resizedProfilePicResult.value,
    );
    return {
      isSuccess: false,
      value: result,
      errorMessage: resizedProfilePicResult.errorMessage,
    };
  }
  result.profilePicFile = resizedProfilePicResult.value;

  const bioMediaFilesFromForm = formData[FormDataKey.bioMediaFiles];
  for (const bioMediaFileFromForm of makeArrayOrDefault(bioMediaFilesFromForm)) {
    const bioMediaDbBufferResult = await processImageFromFormData(bioMediaFileFromForm);
    if (bioMediaDbBufferResult.isSuccess == false) {
      getLog().e(
        'handleBuilderFormSubmission bioMediaFileFromForm',
        bioMediaDbBufferResult.errorMessage,
      );
      return {
        isSuccess: false,
        value: result,
        errorMessage: bioMediaDbBufferResult.errorMessage,
      };
    }

    if (result.bioMediaFiles == null) result.bioMediaFiles = [];
    result.bioMediaFiles.push(bioMediaDbBufferResult.value);
  }

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
