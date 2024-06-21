import 'reflect-metadata';
import { describe, expect, test } from 'vitest';

import { LocalStorageService } from './localStorageService';
import Container from 'typedi';
import { APP_TYPE, ConfigService } from './configService';
import { LogService } from './logService';
import { AppType } from '@constants/enum/appType';

describe('Log service', () => {
  test('uses console.log when not prod', () => {
    class MockConfigService {
      isProd = () => false;
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(APP_TYPE, AppType.UI);

    const logServ = new LogService();
    logServ.i('i', 'tester');
    logServ.w('w', 'tester');
    logServ.e('e', 'tester');
    expect(logServ.getLogs().length).toBe(0);
  });
  test('uses console.log when not in UI', () => {
    class MockConfigService {
      isProd = () => true;
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(APP_TYPE, AppType.Api);

    const logServ = new LogService();
    logServ.i('i', 'tester');
    logServ.w('w', 'tester');
    logServ.e('e', 'tester');
    expect(logServ.getLogs().length).toBe(0);
  });
  test('tracks logs made', () => {
    class MockConfigService {
      isProd = () => true;
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(APP_TYPE, AppType.UI);

    const logServ = new LogService();
    logServ.i('i');
    logServ.w('w', 'tester');
    logServ.e('e', 'tester');
    expect(logServ.getLogs().length).toBe(3);
  });
});
