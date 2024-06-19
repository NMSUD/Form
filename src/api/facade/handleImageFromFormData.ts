import { IFile } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { getImageProcessingService } from '@services/internal/imageProcessingService';
import { getLog } from '@services/internal/logService';
import { IImageRestriction, apiFileUploadRestriction } from '@validation/imageValidation';
import { processImageFromFormData } from './processImage';
import { IDatabaseFile } from '@contracts/databaseFile';
import { anyObject } from '@helpers/typescriptHacks';

export const handleImageFromFormData = async (props: {
  fileFromForm: IFile;
  restrictions: IImageRestriction;
  fileName: string;
  handlerName: string;
  width?: number;
  height?: number;
}): Promise<ResultWithValue<IDatabaseFile>> => {
  const imageMetaResult = await getImageProcessingService().getMetaData({
    input: props.fileFromForm.filepath,
  });
  const restriction = apiFileUploadRestriction(props.restrictions, props.fileName);
  const validationResult = restriction(imageMetaResult.value);
  if (validationResult.isValid === false) {
    getLog().w(
      `${props.handlerName} ${props.fileName} validation: `,
      validationResult.errorMessage,
    );
    return {
      isSuccess: false,
      value: anyObject,
      errorMessage: validationResult.errorMessage ?? 'validation failed',
    };
  }

  const resizedPicResult = await processImageFromFormData({
    fileFromForm: props.fileFromForm,
    handlerName: props.handlerName,
    width: props.width,
    height: props.height,
  });
  if (resizedPicResult.isSuccess == false) {
    getLog().e(`${props.handlerName} ${props.fileName} resize: `, resizedPicResult.value);
    return {
      isSuccess: false,
      value: anyObject,
      errorMessage: resizedPicResult.errorMessage,
    };
  }

  return {
    isSuccess: true,
    value: resizedPicResult.value,
    errorMessage: '',
  };
};
