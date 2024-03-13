import fs from 'fs';
import path from 'path';
import { describe, expect, test } from 'vitest';

import { ApiFileService } from './apiFileService';
import { unitTestExternalImages, unitTestImages } from '../../tests/unitTestImages';

describe('API file service', () => {
  test('download file from url', async () => {
    const service = new ApiFileService();
    const result = await service.downloadFileFromUrl(
      unitTestExternalImages[0].input,
      __dirname,
      'tester.png',
    );
    expect(result.isSuccess).toBeTruthy();

    const fileLocation = path.join(__dirname, result.value);
    const fileExists = fs.existsSync(fileLocation);
    expect(fileExists).toBeTruthy();
    fs.unlinkSync(fileLocation);
  });
  test('buffer from formData', async () => {
    const testImg = unitTestImages[0];
    const service = new ApiFileService();
    const result = await service.formDataToBuffer({
      filepath: testImg.input,
      newFilename: testImg.input,
      mimetype: 'png',
    });
    expect(result.isSuccess).toBeTruthy();
  });
  test('db file from formData', async () => {
    const testImg = unitTestImages[0];
    const service = new ApiFileService();
    const result = await service.formDataToDatabaseFile({
      filepath: testImg.input,
      newFilename: testImg.input,
      mimetype: 'png',
    });
    expect(result.isSuccess).toBeTruthy();
    expect(result.value.name).toBe(testImg.input);
  });
});
