import { IDatabaseFile } from '@contracts/databaseFile';
import { IFile } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { anyObject } from '@helpers/typescriptHacks';
import { getApiFileService } from '@services/internal/apiFileService';
import { getImageProcessingService } from '@services/internal/imageProcessingService';
import { getLog } from '@services/internal/logService';

export const processImageFromFormData = async (props: {
  fileFromForm: IFile;
  handlerName: string;
  width?: number;
  height?: number;
}): Promise<ResultWithValue<IDatabaseFile>> => {
  const bufferResult = await getApiFileService().formDataToBuffer(props.fileFromForm);
  if (bufferResult.isSuccess == false) {
    getLog().e(`${props.handlerName} processImageFromFormData: `, bufferResult.value);
    return {
      isSuccess: false,
      value: anyObject,
      errorMessage: bufferResult.errorMessage,
    };
  }

  const resizedBufferResult = await getImageProcessingService().resize({
    input: bufferResult.value,
    resize: {
      width: props.width,
      height: props.height,
      fit: 'contain',
    },
  });

  return {
    isSuccess: true,
    value: {
      name: props.fileFromForm.newFilename,
      mediaType: props.fileFromForm.mimetype,
      enablePublicUrl: true,
      base64Content: resizedBufferResult.value.toString('base64'),
    },
    errorMessage: '',
  };
};
