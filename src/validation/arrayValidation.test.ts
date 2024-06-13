import { test, describe, expect } from 'vitest';

import { maxItems, minItems, selectedItemsExist } from './arrayValidation';

describe('Array Validation', () => {
  describe('Array min items', () => {
    test('minItems on null array', () => {
      const arr: any = null;
      const validator = minItems(1);
      expect(validator(arr).isValid).toBeFalsy();
    });
    test('minItems on empty array', () => {
      const arr: Array<any> = [];
      const validator = minItems(1);
      expect(validator(arr).isValid).toBeFalsy();
    });
    test('minItems with 1 item', () => {
      const arr: Array<any> = [{ test: 'tester' }];
      const validator = minItems(1);
      expect(validator(arr).isValid).toBeTruthy();
    });
  });

  describe('Array max items', () => {
    test('maxItems on null array', () => {
      const arr: any = null;
      const validator = maxItems(1);
      expect(validator(arr).isValid).toBeTruthy();
    });
    test('maxItems on empty array', () => {
      const arr: Array<any> = [];
      const validator = maxItems(1);
      expect(validator(arr).isValid).toBeTruthy();
    });
    test('maxItems 1 with 1 item', () => {
      const arr: Array<any> = [{ test: 'tester' }];
      const validator = maxItems(1);
      expect(validator(arr).isValid).toBeTruthy();
    });
    test('maxItems 1 with 2 item', () => {
      const arr: Array<any> = [{ test: 'tester' }, { test: 'tester2' }];
      const validator = maxItems(1);
      expect(validator(arr).isValid).toBeFalsy();
    });
    test('maxItems 2 with 1 item', () => {
      const arr: Array<any> = [{ test: 'tester' }];
      const validator = maxItems(2);
      expect(validator(arr).isValid).toBeTruthy();
    });
  });

  describe('Array valid options', () => {
    test('selected item not valid', () => {
      const arr: Array<string> = ['test', 'tester'];
      const validator = selectedItemsExist(arr);
      expect(validator(['fred']).isValid).toBeFalsy();
    });
    test('selected item valid', () => {
      const arr: Array<string> = ['test', 'tester', 'fred'];
      const validator = selectedItemsExist(arr);
      expect(validator(['test']).isValid).toBeTruthy();
    });
    test('selected items valid', () => {
      const arr: Array<string> = ['test', 'tester', 'fred'];
      const validator = selectedItemsExist(arr);
      expect(validator(['fred', 'test']).isValid).toBeTruthy();
    });
  });
});
