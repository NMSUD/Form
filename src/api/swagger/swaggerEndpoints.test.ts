import 'reflect-metadata';
import Container from 'typedi';
import { describe, expect, test } from 'vitest';
import path from 'path';

import { BOT_PATH } from '@services/internal/configService';
import { versionSwagger } from './versionSwagger';
import { SwaggerBuilder } from './swaggerBuilder';
import { baseFormHandlerSwagger } from './baseFormHandlerSwagger';
import { baseStatusHandlerSwagger } from './baseStatusHandlerSwagger';
import { baseVerifyHandlerSwagger } from './baseVerifyHandlerSwagger';

describe('Swagger endpoints', () => {
  test.each([
    ['baseFormHandlerSwagger', baseFormHandlerSwagger, 'form', 'post'],
    ['baseStatusHandlerSwagger', baseStatusHandlerSwagger, 'status', 'get'],
    ['baseVerifyHandlerSwagger', baseVerifyHandlerSwagger, 'verify', 'get'],
    ['versionSwagger', versionSwagger, 'version', 'get'],
  ])('endpoint %s generates expected swagger docs', (_, endpointGenerator, endpoint, method) => {
    Container.set(BOT_PATH, path.join(__dirname, '../'));
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
