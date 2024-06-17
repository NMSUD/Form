import fs from 'fs';
import url from 'url';
import path from 'path';
import 'reflect-metadata';
import Container from 'typedi';
import { describe, expect, test } from 'vitest';

import { BOT_PATH } from '@services/internal/configService';
import { SwaggerBuilder } from './swaggerBuilder';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);

describe('Swagger Builder', () => {
  test('default version number on package.json not found', async () => {
    Container.set(BOT_PATH, directory);
    const swaggerBuilder = new SwaggerBuilder();
    const spec = swaggerBuilder.toSpec();
    expect(spec.info.version).toBe('0.0.0');
  });
  test('add path sets the paths prop in spec', async () => {
    Container.set(BOT_PATH, path.join(directory, '../'));
    const swaggerBuilder = new SwaggerBuilder();
    swaggerBuilder.addPath({
      ['test']: {
        get: {
          tags: ['Form'],
          description: 'tester',
        },
      },
    } as any);
    const spec = swaggerBuilder.toSpec();
    expect(Object.keys(spec.paths ?? {}).length).toBe(1);
  });
  test('add component sets the components prop in spec', async () => {
    Container.set(BOT_PATH, path.join(directory, '../'));
    const swaggerBuilder = new SwaggerBuilder();
    swaggerBuilder.addComponent({
      segment: {
        type: 'string',
        enum: ['1', '2', '3'],
        additionalProperties: false,
      },
    });
    const spec = swaggerBuilder.toSpec();
    expect(Object.keys(spec.components ?? {}).length).toBe(1);
  });
  test('custom css returns string', async () => {
    const swaggerBuilder = new SwaggerBuilder();
    const customCss = swaggerBuilder.getCustomCss();
    expect(customCss.length).toBeGreaterThan(50);
  });
});
