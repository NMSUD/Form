import 'reflect-metadata';
import { describe, expect, test } from 'vitest';

import Container from 'typedi';
import { ConfigService } from './configService';
import { LocalStorageService } from './localStorageService';

describe('LocalStorage service', () => {
  test('set and get', () => {
    const localStorageServ = new LocalStorageService();
    localStorageServ.set('TEST', 'tester');
    expect(localStorageServ.get('TEST')).toBe('tester');
  });
  test('set and get invalid data', () => {
    const localStorageServ = new LocalStorageService();
    localStorageServ.set('nmsud-form', 'tester');
    localStorageServ.removeAllTrackedKeys();
    expect(localStorageServ.get('nmsud-form')).toBe(null);
  });
  test('parse failed, return null', () => {
    class MockConfigService {
      isProd = () => false;
    }
    Container.set(ConfigService, new MockConfigService());
    localStorage.setItem('nmsud-form', 'test');
    const localStorageServ = new LocalStorageService();
    expect(localStorageServ.get('nmsud-form')).toBe(null);
  });
  test('parse failed, return null', () => {
    class MockConfigService {
      isProd = () => false;
    }
    Container.set(ConfigService, new MockConfigService());
    localStorage.setItem('nmsud-form', 'test');
    const localStorageServ = new LocalStorageService();
    expect(localStorageServ.get('nmsud-form')).toBe(null);
  });
});
