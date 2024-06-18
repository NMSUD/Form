import { processImageFromFormData } from '@api/facade/processImage';
import { FormDataKey } from '@constants/form';
import { DefaultImageSize } from '@constants/image';
import { IDatabaseFile } from '@contracts/databaseFile';
import { IFormWithFiles } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { getLog } from '@services/internal/logService';

export interface IBuilderImages {
  profilePicFile?: IDatabaseFile;
}

export const builderFileHandler = async (
  formData: IFormWithFiles,
): Promise<ResultWithValue<IBuilderImages>> => {
  const result: IBuilderImages = {};

  const profilePicFileFromForm = formData[FormDataKey.profilePicFile];
  const resizedProfilePicResult = await processImageFromFormData({
    fileFromForm: profilePicFileFromForm,
    ...DefaultImageSize,
  });
  if (resizedProfilePicResult.isSuccess == false) {
    getLog().e('handleBuilderFormSubmission profilePicFileFromForm', resizedProfilePicResult.value);
    return {
      isSuccess: false,
      value: result,
      errorMessage: resizedProfilePicResult.errorMessage,
    };
  }
  result.profilePicFile = resizedProfilePicResult.value;

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
