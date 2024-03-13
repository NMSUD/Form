import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import Container from 'typedi';
import { describe, expect, test } from 'vitest';

import { BOT_PATH } from '@services/internal/configService';
import { SwaggerBuilder } from './swaggerBuilder';

describe('Swagger Builder', () => {
  test('default version number on package.json not found', async () => {
    Container.set(BOT_PATH, __dirname);
    const swaggerBuilder = new SwaggerBuilder();
    const spec = swaggerBuilder.toSpec();
    expect(spec.info.version).toBe('0.0.0');
  });
  test('add path sets the paths prop in spec', async () => {
    Container.set(BOT_PATH, path.join(__dirname, '../'));
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
    Container.set(BOT_PATH, path.join(__dirname, '../'));
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
  test('custom css loads scss file', async () => {
    Container.set(BOT_PATH, path.join(__dirname, '../'));
    const swaggerCustomStylesFile = path.join(__dirname, '../../web/scss/_swagger.scss');
    const swaggerCustomStyles = fs.readFileSync(swaggerCustomStylesFile, 'utf8');

    const swaggerBuilder = new SwaggerBuilder();
    const customCss = swaggerBuilder.getCustomCss();
    expect(customCss).toBe(swaggerCustomStyles);
  });
  test('custom css returns empty string on failure to load scss file', async () => {
    Container.set(BOT_PATH, __dirname);
    const swaggerBuilder = new SwaggerBuilder();
    const customCss = swaggerBuilder.getCustomCss();
    expect(customCss).toBe('');
  });
});
