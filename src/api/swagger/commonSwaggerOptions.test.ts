import url from 'url';
import path from 'path';
import Container from 'typedi';
import { describe, expect, test, vi } from 'vitest';

import { BOT_PATH } from '@services/internal/configService';
import { registerSwaggerStaticComponents } from './commonSwaggerOptions';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);

describe('Swagger static components', () => {
  test('expected components exist', async () => {
    Container.set(BOT_PATH, path.join(directory, '../'));
    const addComponent = vi.fn();
    const swaggerBuilder: any = {
      addComponent,
    };
    registerSwaggerStaticComponents(swaggerBuilder);
    expect(addComponent).toBeCalledTimes(3);
  });
});
