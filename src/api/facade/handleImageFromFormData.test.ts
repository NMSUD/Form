import 'reflect-metadata';
import { describe, expect, test, vi } from 'vitest';
import Container from 'typedi';

import { unitTestImages } from '../../tests/unitTestImages';
import { processImageFromFormData } from './processImage';
import { ApiFileService } from '@services/internal/apiFileService';
import { ImageProcessingService } from '@services/internal/imageProcessingService';
import { handleImageFromFormData } from './handleImageFromFormData';
import { DefaultImageRestrictions, DefaultImageSize } from '@constants/image';
import { FormDataKey } from '@constants/form';
import { anyObject } from '@helpers/typescriptHacks';
import { IFile } from '@contracts/file';
import { IImageMetaDataProps } from '@contracts/image';

// const formDataToBuffer = vi.fn().mockResolvedValue({
//   isSuccess: false,
// });
// class MockApiFileService {
//   formDataToBuffer = formDataToBuffer;
//   formDataToDatabaseFile = vi.fn();
//   downloadFileFromUrl = vi.fn();
// }
// Container.set(ApiFileService, new MockApiFileService());

describe('Handle imagedata from FormData', () => {
  const formData = {
    [FormDataKey.profilePicFile]: anyObject as IFile,
  };
  const imgFormDataProps = {
    fileFromForm: formData[FormDataKey.profilePicFile],
    restrictions: DefaultImageRestrictions.profilePic,
    fileName: 'profilePic',
    handlerName: 'builderFileHandler',
    ...DefaultImageSize,
  };
  describe('MetaData logic', () => {
    test('exits on failed metadata', async () => {
      class MockImageProcessingService {
        getMetaData = vi.fn().mockResolvedValue({
          isSuccess: false,
        });
      }
      Container.set(ImageProcessingService, new MockImageProcessingService());

      const img = await handleImageFromFormData(imgFormDataProps);
      expect(img.isSuccess).toBeFalsy();
    });
    test('exits on failed metadata', async () => {
      class MockImageProcessingService {
        getMetaData = vi.fn().mockResolvedValue({
          isSuccess: false,
        });
      }
      Container.set(ImageProcessingService, new MockImageProcessingService());

      const img = await handleImageFromFormData(imgFormDataProps);
      expect(img.isSuccess).toBeFalsy();
    });
  });
  describe('Restriction logic', () => {
    test('exits on failed validation', async () => {
      class MockImageProcessingService {
        getMetaData = vi.fn().mockResolvedValue({
          isSuccess: true,
          value: {
            size: 100,
            width: 100,
            height: 100,
          },
        });
      }
      Container.set(ImageProcessingService, new MockImageProcessingService());

      const img = await handleImageFromFormData(imgFormDataProps);
      expect(img.isSuccess).toBeFalsy();
    });
  });
  describe('Resize logic', () => {
    test('exits on resize failure', async () => {
      class MockImageProcessingService {
        getMetaData = vi.fn().mockResolvedValue({
          isSuccess: true,
          value: {
            size: 512,
            width: 512,
            height: 512,
          },
        });
      }
      Container.set(ImageProcessingService, new MockImageProcessingService());

      const img = await handleImageFromFormData(imgFormDataProps);
      expect(img.isSuccess).toBeFalsy();
    });
    test('success on resize', async () => {
      const formDataToBuffer = vi.fn().mockResolvedValue({
        isSuccess: true,
        value: 'stuff',
      });
      class MockApiFileService {
        formDataToBuffer = formDataToBuffer;
        formDataToDatabaseFile = vi.fn();
        downloadFileFromUrl = vi.fn();
      }
      Container.set(ApiFileService, new MockApiFileService());

      const resize = vi.fn().mockResolvedValue({
        isSuccess: false,
        value: 'resized',
      });
      class MockImageProcessingService {
        resize = resize;
        getMetaData = vi.fn().mockResolvedValue({
          isSuccess: true,
          value: {
            size: 512,
            width: 512,
            height: 512,
          },
        });
      }
      Container.set(ImageProcessingService, new MockImageProcessingService());

      const img = await handleImageFromFormData(imgFormDataProps);
      expect(img.isSuccess).toBeTruthy();
    });
  });
});
