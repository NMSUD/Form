import fs from 'fs';
import { describe, expect, test } from 'vitest';

import { unitTestExternalImages, unitTestImages } from './unitTestImages';

describe('Unit Test Images', () => {
  test.each(
    unitTestImages.map((img) => [img.input]), //
  )('Image %s exists', (input) => {
    const fileExists = fs.existsSync(input);
    expect(fileExists).toBeTruthy();
  });
  test.each(
    unitTestExternalImages.map((img) => [img.input]), //
  )('Remote image %s exists', async (input) => {
    const fetchResponse = await fetch(input);
    expect(fetchResponse.status).toBe(200);
  });
});
