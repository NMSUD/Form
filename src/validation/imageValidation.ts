import { ValidationResult } from "../contracts/validationResult";
import { IImageParams } from "../helper/imageHelper";


export interface IImageRestriction {
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    maxSizeMb?: number;
}

export interface IImageWithParams extends File, IImageParams { }

export const webImageRestrictions = (restrictions: IImageRestriction) =>
    (value: IImageWithParams): ValidationResult => {
        if (restrictions.maxHeight != null) {
            if (restrictions.maxHeight < value.height) {
                return { isValid: false, errorMessage: `Image is too big, height should be less than or equal to ${restrictions.maxHeight}px.` };
            }
        }
        if (restrictions.maxWidth != null) {
            if (restrictions.maxWidth < value.width) {
                return { isValid: false, errorMessage: `Image is too big, width should be less than or equal to ${restrictions.maxWidth}px.` };
            }
        }

        if (restrictions.minHeight != null) {
            if (restrictions.minHeight > value.height) {
                return { isValid: false, errorMessage: `Image is too small, height should be greater than or equal to ${restrictions.minHeight}px.` };
            }
        }
        if (restrictions.minWidth != null) {
            if (restrictions.minWidth > value.width) {
                return { isValid: false, errorMessage: `Image is too small, width should be greater than or equal to ${restrictions.minWidth}px.` };
            }
        }
        if (restrictions.maxSizeMb != null) {
            const sizeInMb = value.fileSize / (1024.0 * 1024.0);
            if (restrictions.maxSizeMb < sizeInMb) {
                return { isValid: false, errorMessage: `Image is too large, image size limit is ${restrictions.maxSizeMb}mb.` };
            }
        }

        return { isValid: true, errorMessage: '' };
    };
