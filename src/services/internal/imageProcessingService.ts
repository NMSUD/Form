import sharp, { ResizeOptions } from 'sharp';
import { Container, Service } from 'typedi';

import {
  IImageMetaDataProps,
  IImageProcessingOutputProps,
  IImageProcessingProps,
} from '@contracts/image';
import { ResultWithValue } from '@contracts/resultWithValue';
import { anyObject } from '@helpers/typescriptHacks';

@Service()
export class ImageProcessingService {
  getMetaData = async (
    props: IImageProcessingProps,
  ): Promise<ResultWithValue<IImageMetaDataProps>> => {
    try {
      const metadata = await sharp(props.input).metadata();
      return {
        isSuccess: true,
        value: metadata,
        errorMessage: '',
      };
    } catch (ex) {
      return {
        isSuccess: false,
        errorMessage: `Image metadata failed, ${ex?.toString?.()}`,
        value: anyObject,
      };
    }
  };

  resize = async (
    props: IImageProcessingProps & {
      output?: IImageProcessingOutputProps;
      resize: ResizeOptions;
    },
  ): Promise<ResultWithValue<Buffer>> => {
    const { input, output, resize } = props;

    let sharpTasks = sharp(input);
    if (resize.fit == null) resize.fit = 'outside';
    if (resize.position == null) resize.position = 'centre';
    sharpTasks = sharpTasks.resize({ ...resize });

    if (output?.outputType != null) {
      sharpTasks = sharpTasks.toFormat(output.outputType);
    }

    try {
      const result = await sharpTasks
        .withExif({}) // remove exif and metadata
        .withMetadata({})
        .toBuffer();
      return {
        isSuccess: true,
        value: result,
        errorMessage: '',
      };
    } catch (ex) {
      return {
        isSuccess: false,
        errorMessage: `Image resize failed, ${ex?.toString?.()}`,
        value: anyObject,
      };
    }
  };
}

export const getImageProcessingService = () => Container.get(ImageProcessingService);
