import { test, describe, expect } from 'vitest';

import { makeArrayOrDefault } from './arrayHelper';

describe('Helper tests', () => {
  describe('makeArrayOrDefault', () => {
    test('on undefined', () => {
      const arr: any = undefined;
      const arrVal = makeArrayOrDefault(arr);
      expect(Array.isArray(arrVal)).toBeTruthy();
    });
    test('on null', () => {
      const arr: any = null;
      const arrVal = makeArrayOrDefault(arr);
      expect(Array.isArray(arrVal)).toBeTruthy();
    });
    test('on null with defined value', () => {
      const arr: any = null;
      const defaultArr = ['test1', 'test2'];
      const arrVal = makeArrayOrDefault(arr, defaultArr);
      expect(Array.isArray(arrVal)).toBeTruthy();
      expect(arrVal.length).toBe(defaultArr.length);
    });
    test('array is not null', () => {
      const arr = 'test';
      const defaultArr = ['test1', 'test2'];
      const arrVal = makeArrayOrDefault(arr, defaultArr);
      expect(Array.isArray(arrVal)).toBeTruthy();
      expect(arrVal.length).toBe(1);
    });
  });
});
