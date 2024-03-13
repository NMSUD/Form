import 'reflect-metadata';
import { describe, expect, test, vi } from 'vitest';
import Container from 'typedi';

import { unitTestImages } from '../../tests/unitTestImages';
import { processImageFromFormData } from './processImage';
import { ApiFileService } from '@services/internal/apiFileService';
import { ImageProcessingService } from '@services/internal/imageProcessingService';

describe('Process images from formData', () => {
  test('uses api file service', async () => {
    const formDataToBuffer = vi.fn().mockResolvedValue({
      isSuccess: false,
    });
    class MockApiFileService {
      formDataToBuffer = formDataToBuffer;
      formDataToDatabaseFile = vi.fn();
      downloadFileFromUrl = vi.fn();
    }
    Container.set(ApiFileService, new MockApiFileService());

    const testImg = unitTestImages[0];
    await processImageFromFormData({
      filepath: testImg.input,
      newFilename: testImg.input,
      mimetype: 'png',
    });
    expect(formDataToBuffer).toHaveBeenCalled();
  });
  test('resizes image', async () => {
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
      getMetaData = vi.fn();
    }
    Container.set(ImageProcessingService, new MockImageProcessingService());

    const testImg = unitTestImages[0];
    await processImageFromFormData({
      filepath: testImg.input,
      newFilename: testImg.input,
      mimetype: 'png',
    });
    expect(resize).toHaveBeenCalled();
  });
});
