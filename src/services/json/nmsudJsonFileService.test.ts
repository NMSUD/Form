import 'reflect-metadata';
import { describe, expect, test, vi } from 'vitest';
import Container from 'typedi';

import { NmsUdJsonFileService } from './nmsudJsonFileService';
import { ConfigService } from '@services/internal/configService';
import { promiseFromResult } from '@helpers/typescriptHacks';

describe('Nmsud json file service', () => {
  test('getListOf calls fetch with expected url', async () => {
    const baseUrl = 'https://form-data.nmsud.com';
    global.fetch = vi.fn().mockReturnValue(promiseFromResult(['test']));
    class MockConfigService {
      getNmsUdFormDataUrl = () => baseUrl;
    }
    Container.set(ConfigService, new MockConfigService());
    const jsonServ = new NmsUdJsonFileService();
    await jsonServ.getListOf('builder');
    expect(global.fetch).toBeCalledWith(`${baseUrl}/builder.json`, {});
  });
});
