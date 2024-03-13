import { describe, expect, test } from 'vitest';

import { maxLength, minLength, shouldBeUrl } from './textValidation';

describe('Text Validation', () => {
  describe('min length', () => {
    test('minItems on null', () => {
      const text: any = null;
      const validator = minLength(5);
      expect(validator(text).isValid).toBeFalsy();
    });
    test('minItems on empty string', () => {
      const text = '';
      const validator = minLength(5);
      expect(validator(text).isValid).toBeFalsy();
    });
    test('minItems with too few characters', () => {
      const text = 'abc';
      const validator = minLength(5);
      expect(validator(text).isValid).toBeFalsy();
    });
    test('minItems with enough characters', () => {
      const text = 'testerString';
      const validator = minLength(5);
      expect(validator(text).isValid).toBeTruthy();
    });
  });

  describe('max length', () => {
    test('maxLength on null', () => {
      const text: any = null;
      const validator = maxLength(5);
      expect(validator(text).isValid).toBeTruthy();
    });
    test('maxLength on empty string', () => {
      const text = '';
      const validator = maxLength(5);
      expect(validator(text).isValid).toBeTruthy();
    });
    test('maxLength with too many characters', () => {
      const text = 'testerString';
      const validator = maxLength(5);
      expect(validator(text).isValid).toBeFalsy();
    });
    test('maxLength with correct number of characters', () => {
      const text = 'abc';
      const validator = maxLength(5);
      expect(validator(text).isValid).toBeTruthy();
    });
  });

  describe('should be url', () => {
    test('shouldBeUrl on null', () => {
      const text: any = null;
      expect(shouldBeUrl(text).isValid).toBeFalsy();
    });
    test('shouldBeUrl on empty string', () => {
      const text = '';
      expect(shouldBeUrl(text).isValid).toBeFalsy();
    });
    test('shouldBeUrl with an invalid url', () => {
      const text = 'testerString';
      expect(shouldBeUrl(text).isValid).toBeFalsy();
    });
    test('shouldBeUrl with a valid url', () => {
      const text = 'http://google.com';
      expect(shouldBeUrl(text).isValid).toBeTruthy();
    });
  });
});
