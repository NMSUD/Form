import { handleImageFromFormData } from '@api/facade/handleImageFromFormData';
import { FormDataKey } from '@constants/form';
import { DefaultImageRestrictions, DefaultImageSize } from '@constants/image';
import { IDatabaseFile } from '@contracts/databaseFile';
import { IFormWithFiles } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';

export interface IBuilderImages {
  profilePicFile?: IDatabaseFile;
}

export const builderFileHandler = async (
  formData: IFormWithFiles,
): Promise<ResultWithValue<IBuilderImages>> => {
  const result: IBuilderImages = {};

  const profilePicResult = await handleImageFromFormData({
    fileFromForm: formData[FormDataKey.profilePicFile],
    restrictions: DefaultImageRestrictions.profilePic,
    fileName: 'profilePic',
    handlerName: 'builderFileHandler',
    ...DefaultImageSize,
  });
  if (profilePicResult.isSuccess == false) {
    return { ...profilePicResult, value: result };
  }
  result.profilePicFile = profilePicResult.value;

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
