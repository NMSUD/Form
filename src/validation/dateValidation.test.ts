import { describe, expect, test } from 'vitest';

import { minDate, maxDate } from './dateValidation';

describe('Date Validation', () => {
  describe('min date', () => {
    test('minDate on null', () => {
      const text: any = null;
      const validator = minDate(new Date('2021-01-01'));
      expect(validator(text).isValid).toBeFalsy();
    });
    test('minDate on earlier date', () => {
      const testDate = new Date('2020-01-01');
      const validator = minDate(new Date('2021-01-01'));
      expect(validator(testDate).isValid).toBeFalsy();
    });
    test('minDate with earlier date string', () => {
      const testDate: any = '2017-01-12';
      const validator = minDate(new Date('2021-01-01'));
      expect(validator(testDate).isValid).toBeFalsy();
    });
    test('minDate on later date', () => {
      const testDate = new Date('2022-01-01');
      const validator = minDate(new Date('2021-01-01'));
      expect(validator(testDate).isValid).toBeTruthy();
    });
  });

  describe('max date', () => {
    test('maxDate on null', () => {
      const text: any = null;
      const validator = maxDate(new Date('2021-01-01'));
      expect(validator(text).isValid).toBeFalsy();
    });
    test('maxDate on earlier date', () => {
      const testDate = new Date('2020-01-01');
      const validator = maxDate(new Date('2021-01-01'));
      expect(validator(testDate).isValid).toBeTruthy();
    });
    test('maxDate on later date', () => {
      const testDate = new Date('2022-01-01');
      const validator = maxDate(new Date('2021-01-01'));
      expect(validator(testDate).isValid).toBeFalsy();
    });
  });
});
