import path from 'path';
import 'reflect-metadata';
import Container from 'typedi';
import url from 'url';
import { describe, expect, test } from 'vitest';

import { BOT_PATH } from '@services/internal/configService';
import { baseFormHandlerSwagger } from './baseFormHandlerSwagger';
import { baseStatusHandlerSwagger } from './baseStatusHandlerSwagger';
import { baseVerifyHandlerSwagger } from './baseVerifyHandlerSwagger';
import { SwaggerBuilder } from './swaggerBuilder';
import { versionSwagger } from './versionSwagger';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);

describe('Swagger endpoints', () => {
  test.each([
    ['baseFormHandlerSwagger', baseFormHandlerSwagger, 'form', 'post'],
    ['baseStatusHandlerSwagger', baseStatusHandlerSwagger, 'status', 'get'],
    ['baseVerifyHandlerSwagger', baseVerifyHandlerSwagger, 'verify', 'get'],
    ['versionSwagger', versionSwagger, 'version', 'get'],
  ])('endpoint %s generates expected swagger docs', (_, endpointGenerator, endpoint, method) => {
    Container.set(BOT_PATH, path.join(directory, '../'));
    const swaggerBuilder = new SwaggerBuilder();
    endpointGenerator({
      path: endpoint,
      method,
      swaggerBuilder,
    });

    const spec = swaggerBuilder.toSpec();
    const endpointPath = spec.paths?.[`/${endpoint}`];
    expect(endpointPath != null).toBeTruthy();
    expect((endpointPath as Record<string, unknown>)?.[method] != null).toBeTruthy();
  });
});
