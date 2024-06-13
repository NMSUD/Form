import { DefaultImageSize } from '@constants/image';
import { IDatabaseFile } from '@contracts/databaseFile';
import { IFile } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { anyObject } from '@helpers/typescriptHacks';
import { getApiFileService } from '@services/internal/apiFileService';
import { getImageProcessingService } from '@services/internal/imageProcessingService';
import { getLog } from '@services/internal/logService';

export const processImageFromFormData = async (
  fileFromForm: IFile,
): Promise<ResultWithValue<IDatabaseFile>> => {
  const bufferResult = await getApiFileService().formDataToBuffer(fileFromForm);
  if (bufferResult.isSuccess == false) {
    getLog().e('processImageFromFormData: ', bufferResult.value);
    return {
      isSuccess: false,
      value: anyObject,
      errorMessage: bufferResult.errorMessage,
    };
  }

  const resizedBufferResult = await getImageProcessingService().resize({
    input: bufferResult.value,
    resize: { ...DefaultImageSize },
  });

  return {
    isSuccess: true,
    value: {
      name: fileFromForm.newFilename,
      mediaType: fileFromForm.mimetype,
      enablePublicUrl: true,
      base64Content: resizedBufferResult.value.toString('base64'),
    },
    errorMessage: '',
  };
};
