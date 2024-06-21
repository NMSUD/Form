import { describe, expect, test } from 'vitest';

import { IImageParams } from '@helpers/imageHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { MediaUploadType } from '@web/contracts/mediaUpload';
import {
  IImageRestriction,
  apiFileUploadRestriction,
  isValidWebImage,
  mediaUploadRestriction,
  webImageRestrictions,
} from './imageValidation';

describe('Image Validation', () => {
  describe('isValidWebImage', () => {
    const validator = isValidWebImage();
    test('invalid on null', () => {
      const result = validator(null as any);
      expect(result.isValid).toBeFalsy();
    });
    test('uses default error message on invalid', () => {
      const result = validator(null as any);
      expect(result.errorMessage).toBe('Upload a valid image.');
    });
    test('invalid if no name', () => {
      const result = validator({ fileSize: 0 } as any);
      expect(result.isValid).toBeFalsy();
    });
    test('invalid if no fileSize', () => {
      const result = validator({ name: 'test' } as any);
      expect(result.isValid).toBeFalsy();
    });
    test('invalid if no fileSize', () => {
      const result = validator({ name: 'test', fileSize: 0 } as any);
      expect(result.isValid).toBeTruthy();
    });
  });
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
  describe('mediaUploadRestriction', () => {
    test('invalid without type', () => {
      const validator = mediaUploadRestriction({});
      const result = validator(anyObject);
      expect(result.isValid).toBeFalsy();
    });
    describe('MediaUploadType.File', () => {
      test('invalid without file or imageDetails', () => {
        const validator = mediaUploadRestriction({});
        const result = validator({ type: MediaUploadType.File } as any);
        expect(result.isValid).toBeFalsy();
      });
      test('calls internal validators', () => {
        const validator = mediaUploadRestriction({});
        const result = validator({
          type: MediaUploadType.File,
          file: {} as any,
          imageDetails: {} as any,
        } as any);
        expect(result.errorMessage).toBe('Upload a valid image.');
      });
    });
    describe('MediaUploadType.ImageUrl', () => {
      test('invalid without url', () => {
        const validator = mediaUploadRestriction({});
        const result = validator({ type: MediaUploadType.ImageUrl } as any);
        expect(result.isValid).toBeFalsy();
      });
      test('valid with good url', () => {
        const validator = mediaUploadRestriction({});
        const result = validator({ type: MediaUploadType.ImageUrl, url: 'youtube.com' });
        expect(result.isValid).toBeTruthy();
      });
    });
    describe('MediaUploadType.VideoUrl', () => {
      test('invalid without url', () => {
        const validator = mediaUploadRestriction({});
        const result = validator({ type: MediaUploadType.VideoUrl } as any);
        expect(result.isValid).toBeFalsy();
      });
      test('valid with good url', () => {
        const validator = mediaUploadRestriction({});
        const result = validator({ type: MediaUploadType.VideoUrl, url: 'youtube.com' });
        expect(result.isValid).toBeTruthy();
      });
    });
  });
  describe('apiFileUploadRestriction', () => {
    test('maps to webImageRestrictions params', () => {
      const validator = apiFileUploadRestriction({}, 'tester');
      const result = validator(anyObject);
      expect(result.isValid).toBeTruthy();
    });
  });
});
