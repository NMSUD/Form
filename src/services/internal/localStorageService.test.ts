import { describe, expect, test } from 'vitest';

import { LocalStorageService } from './localStorageService';

describe('LocalStorage service', () => {
  test('set and get', () => {
    const localStorageServ = new LocalStorageService();
    localStorageServ.set('TEST', 'testertest');
    expect(localStorageServ.get('TEST')).toBe('testertest');
  });
  test('set and get invalid data', () => {
    const localStorageServ = new LocalStorageService();
    localStorageServ.set('nmsud-form', 'testertest');
    localStorageServ.removeAllTrackedKeys();
    expect(localStorageServ.get('nmsud-form')).toBe(null);
  });
});
