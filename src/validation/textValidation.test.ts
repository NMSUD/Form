import { describe, expect, test } from 'vitest';

import { maxLength, minLength, shouldBeUrl, shouldBeYoutubeUrl } from './textValidation';

describe('Text Validation', () => {
  describe('min length', () => {
    test('invalid on null', () => {
      const text: any = null;
      const validator = minLength(5);
      expect(validator(text).isValid).toBeFalsy();
    });
    test('invalid on empty string', () => {
      const text = '';
      const validator = minLength(5);
      expect(validator(text).isValid).toBeFalsy();
    });
    test('invalid with too few characters', () => {
      const text = 'abc';
      const validator = minLength(5);
      expect(validator(text).isValid).toBeFalsy();
    });
    test('valid with enough characters', () => {
      const text = 'testerString';
      const validator = minLength(5);
      expect(validator(text).isValid).toBeTruthy();
    });
  });

  describe('max length', () => {
    test('valid on null', () => {
      const text: any = null;
      const validator = maxLength(5);
      expect(validator(text).isValid).toBeTruthy();
    });
    test('valid on empty string', () => {
      const text = '';
      const validator = maxLength(5);
      expect(validator(text).isValid).toBeTruthy();
    });
    test('invalid with too many characters', () => {
      const text = 'testerString';
      const validator = maxLength(5);
      expect(validator(text).isValid).toBeFalsy();
    });
    test('valid with correct number of characters', () => {
      const text = 'abc';
      const validator = maxLength(5);
      expect(validator(text).isValid).toBeTruthy();
    });
    test('valid with exactly max number of characters', () => {
      const text = 'abcde';
      const validator = maxLength(5);
      expect(validator(text).isValid).toBeTruthy();
    });
  });

  describe('should be url', () => {
    test('invalid on null', () => {
      const text: any = null;
      expect(shouldBeUrl(text).isValid).toBeFalsy();
    });
    test('invalid on empty string', () => {
      const text = '';
      expect(shouldBeUrl(text).isValid).toBeFalsy();
    });
    test('invalid with an invalid url', () => {
      const text = 'testerString';
      expect(shouldBeUrl(text).isValid).toBeFalsy();
    });
    test('valid with a valid url', () => {
      const text = 'http://google.com';
      expect(shouldBeUrl(text).isValid).toBeTruthy();
    });
  });

  describe('should be Youtube url', () => {
    test('invalid on null', () => {
      const text: any = null;
      expect(shouldBeYoutubeUrl(text).isValid).toBeFalsy();
    });
    test('invalid on empty string', () => {
      const text = '';
      expect(shouldBeYoutubeUrl(text).isValid).toBeFalsy();
    });
    test('invalid with an invalid url', () => {
      const text = 'testerString';
      expect(shouldBeYoutubeUrl(text).isValid).toBeFalsy();
    });
    test('valid with a valid url', () => {
      const text = 'https://www.youtube.com/watch?v=hello';
      expect(shouldBeYoutubeUrl(text).isValid).toBeTruthy();
    });
  });
});
