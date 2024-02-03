import 'reflect-metadata';
import { describe, expect, test } from 'vitest';

import { getArrFromEnum, getDropDownOptionsFromEnum } from './enumHelper';

enum TesterEnum {
  test,
  Tester,
  TESTING,
}

describe('Enum helper', () => {
  describe('getArrFromEnum', () => {
    test('get an array from enum', () => {
      const enumArr = getArrFromEnum(TesterEnum);
      expect(enumArr.length).toBe(3);
    });
    test('array from enum is strings of the enum prop', () => {
      const enumArr = getArrFromEnum(TesterEnum);
      expect(enumArr.includes('test')).toBeTruthy;
    });
    test('array from enum is case sensiteive', () => {
      const enumArr = getArrFromEnum(TesterEnum);
      expect(enumArr.includes('Tester')).toBeTruthy;
    });
  });
  describe('getDropDownOptionsFromEnum', () => {
    test('get a dropdown array from enum', () => {
      const enumArr = getDropDownOptionsFromEnum(TesterEnum);
      expect(enumArr.length).toBe(3);
    });
    test('dropdown option value is enum value', () => {
      const enumArr = getDropDownOptionsFromEnum(TesterEnum);
      expect(enumArr[1].value).toBe(TesterEnum.Tester.toString());
    });
  });
});
