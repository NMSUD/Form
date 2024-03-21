import fs from 'fs';
import url from 'url';
import path from 'path';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { ImageProcessingService } from './imageProcessingService';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);

describe('Image processing service', () => {
  const testImages = [
    {
      input: 'public/assets/img/docs/coverageReportScreenshot.png',
      output: 'screenshot.png',
      width: 1220,
      height: 740,
    },
  ];
  beforeAll(async () => {
    for (const testImage of testImages) {
      const fileLocation = path.join(directory, testImage.output);
      fs.copyFileSync(testImage.input, fileLocation);
    }
  });
  afterAll(() => {
    for (const testImage of testImages) {
      const fileLocation = path.join(directory, testImage.output);
      if (fs.existsSync(fileLocation) === true) {
        fs.unlinkSync(fileLocation);
      }
    }
  });

  test('metadata has correct data', async () => {
    const service = new ImageProcessingService();
    const metadataTestImg = testImages[0];
    const fileLocation = path.join(directory, metadataTestImg.output);
    const metadata = await service.getMetaData({
      input: fileLocation,
    });
    expect(metadata.value.format).toBe('png');
    expect(metadata.value.width).toBe(metadataTestImg.width);
    expect(metadata.value.height).toBe(metadataTestImg.height);
  });

  test('metadata handles exception', async () => {
    const service = new ImageProcessingService();
    const metadata = await service.getMetaData({
      input: 'fileLocation',
    });
    expect(metadata.isSuccess).toBeFalsy();
  });

  test('resize image', async () => {
    const service = new ImageProcessingService();
    const metadataTestImg = testImages[0];
    const fileLocation = path.join(directory, metadataTestImg.output);
    const expectedWidth = 200;

    const resizeResult = await service.resize({
      input: fileLocation,
      output: {
        outputType: 'png',
      },
      resize: {
        width: expectedWidth,
      },
    });
    expect(resizeResult.isSuccess).toBeTruthy();

    const metadata = await service.getMetaData({
      input: resizeResult.value,
    });
    expect(metadata.value.width).toBe(expectedWidth);
  });

  test('resize handles exception', async () => {
    const service = new ImageProcessingService();
    const resizeResult = await service.resize({
      input: 'fileLocation',
      output: {
        outputType: 'png',
      },
      resize: {
        width: 123,
      },
    });
    expect(resizeResult.isSuccess).toBeFalsy();
  });
});
