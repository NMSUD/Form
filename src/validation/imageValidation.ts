import { ValidationResult } from '@contracts/validationResult';
import { IImageParams } from '@helpers/imageHelper';
import { IMediaUpload, MediaUploadType } from '@web/contracts/mediaUpload';
import { shouldBeUrl } from './textValidation';
import { multiValidation } from './baseValidation';

export interface IImageRestriction {
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxSizeMb?: number;
}

export interface IImageWithParams extends File, IImageParams {}

export const isValidWebImage =
  (customErrMsg?: string) =>
  (value: IImageParams): ValidationResult => {
    if (value == null || value.name == null || value.fileSize == null) {
      return {
        isValid: false,
        errorMessage: customErrMsg ?? `Upload a valid image.`,
      };
    }

    return { isValid: true, errorMessage: '' };
  };

export const webImageRestrictions =
  (restrictions: IImageRestriction) =>
  (value: IImageWithParams): ValidationResult => {
    const imgName = value.name ?? 'unknown name';
    if (restrictions.maxHeight != null) {
      if (restrictions.maxHeight < value.height) {
        return {
          isValid: false,
          errorMessage: `Image '${imgName}' is too large, height should be less than or equal to ${restrictions.maxHeight}px.`,
        };
      }
    }
    if (restrictions.maxWidth != null) {
      if (restrictions.maxWidth < value.width) {
        return {
          isValid: false,
          errorMessage: `Image '${imgName}' is too large, width should be less than or equal to ${restrictions.maxWidth}px.`,
        };
      }
    }

    if (restrictions.minHeight != null) {
      if (restrictions.minHeight > value.height) {
        return {
          isValid: false,
          errorMessage: `Image '${imgName}' is too small, height should be greater than or equal to ${restrictions.minHeight}px.`,
        };
      }
    }
    if (restrictions.minWidth != null) {
      if (restrictions.minWidth > value.width) {
        return {
          isValid: false,
          errorMessage: `Image '${imgName}' is too small, width should be greater than or equal to ${restrictions.minWidth}px.`,
        };
      }
    }
    if (restrictions.maxSizeMb != null) {
      const sizeInMb = value.fileSize / (1024.0 * 1024.0);
      if (restrictions.maxSizeMb < sizeInMb) {
        return {
          isValid: false,
          errorMessage: `Image '${imgName}' is too large, image size limit is ${restrictions.maxSizeMb}mb.`,
        };
      }
    }

    return { isValid: true, errorMessage: '' };
  };

export const mediaUploadRestriction =
  (restrictions: IImageRestriction, customErrMsg?: string) =>
  (value: IMediaUpload): ValidationResult => {
    if (value == null || value.type == null) {
      return {
        isValid: false,
        errorMessage: customErrMsg ?? 'Invalid file uploaded',
      };
    }
    switch (value.type) {
      case MediaUploadType.File:
        const restrictFunc = multiValidation(
          isValidWebImage(customErrMsg),
          webImageRestrictions(restrictions),
        );
        if (value.file == null || value.imageDetails == null) {
          return {
            isValid: false,
            errorMessage: customErrMsg ?? 'Invalid file uploaded',
          };
        }
        return restrictFunc({ ...value.file, ...value.imageDetails });
      case MediaUploadType.ImageUrl:
      case MediaUploadType.VideoUrl:
        return shouldBeUrl(value.url);
    }
  };
