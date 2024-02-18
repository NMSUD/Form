import { describe, expect, test } from 'vitest';

import { IImageParams } from '@helpers/imageHelper';
import { IImageRestriction, webImageRestrictions } from './imageValidation';

describe('Image Validation', () => {
  describe('webImageRestrictions', () => {
    const imgWithParams: IImageParams | any = {
      width: 100,
      height: 100,
      fileSize: 100 * (1024.0 * 1024.0),
      fileExtension: '.png',
    };

    test('without restrictions', () => {
      const validator = webImageRestrictions({});
      const result = validator(imgWithParams);
      expect(result.isValid).toBeTruthy();
    });
    test('maxWidth', () => {
      const imgRestriction: IImageRestriction = {
        maxWidth: 90,
      };
      const validator = webImageRestrictions(imgRestriction);
      const result = validator(imgWithParams);
      expect(result.isValid).toBeFalsy();
    });
    test('maxHeight', () => {
      const imgRestriction: IImageRestriction = {
        maxHeight: 90,
      };
      const validator = webImageRestrictions(imgRestriction);
      const result = validator(imgWithParams);
      expect(result.isValid).toBeFalsy();
    });
    test('minWidth', () => {
      const imgRestriction: IImageRestriction = {
        minWidth: 101,
      };
      const validator = webImageRestrictions(imgRestriction);
      const result = validator(imgWithParams);
      expect(result.isValid).toBeFalsy();
    });
    test('minHeight', () => {
      const imgRestriction: IImageRestriction = {
        minHeight: 101,
      };
      const validator = webImageRestrictions(imgRestriction);
      const result = validator(imgWithParams);
      expect(result.isValid).toBeFalsy();
    });
    test('maxSizeMb', () => {
      const imgRestriction: IImageRestriction = {
        maxSizeMb: 90,
      };
      const validator = webImageRestrictions(imgRestriction);
      const result = validator(imgWithParams);
      expect(result.isValid).toBeFalsy();
    });
  });
});
