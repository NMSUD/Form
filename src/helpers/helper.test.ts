import { test, describe, expect } from 'vitest';

import { makeArrayOrDefault } from './arrayHelper';
import { formatDate } from './dateHelper';
import { onTargetFile, onTargetValue, preventDefault } from './eventHelper';
import { addSpacesForEnum, capitalizeFirstLetter, lowercaseFirstLetter } from './stringHelper';

describe('Helper tests', () => {
  describe('Make array or default', () => {
    test('makeArrayOrDefault on undefined', () => {
      const arr: any = undefined;
      const arrVal = makeArrayOrDefault(arr);
      expect(Array.isArray(arrVal)).toBeTruthy();
    });
    test('makeArrayOrDefault on null', () => {
      const arr: any = null;
      const arrVal = makeArrayOrDefault(arr);
      expect(Array.isArray(arrVal)).toBeTruthy();
    });
    test('makeArrayOrDefault on null with defined value', () => {
      const arr: any = null;
      const defaultArr = ['test1', 'test2'];
      const arrVal = makeArrayOrDefault(arr, defaultArr);
      expect(Array.isArray(arrVal)).toBeTruthy();
      expect(arrVal.length).toBe(defaultArr.length);
    });
  });

  describe('Date formatter', () => {
    test('formatDate', () => {
      const dateStr = formatDate('2023-01-01');
      expect(dateStr).toBe('01 Jan 23 12:00');
    });
  });

  describe('Event helper', () => {
    test('onTargetValue', () => {
      const event = {
        target: {
          value: 'test',
        },
      };
      let value = 'no';
      const eventHandler = onTargetValue<string>((result) => {
        value = result;
      });
      eventHandler(event);
      expect(value).toBe('test');
    });
    test('onTargetFile', () => {
      const event = {
        target: {
          files: ['test'] as any,
        },
      };
      let value: any = 'no';
      const eventHandler = onTargetFile((result) => {
        value = result;
      });
      eventHandler(event);
      expect(value).toBe('test');
    });
    test('preventDefault', () => {
      let value = 'no';
      const event = {
        preventDefault: () => {
          value = 'test';
        },
      };
      preventDefault(event);
      expect(value).toBe('test');
    });
  });

  describe('String helper', () => {
    test('capitalizeFirstLetter', () => {
      const output = capitalizeFirstLetter('lowercase');
      expect(output).toBe('Lowercase');
    });
    test('lowercaseFirstLetter', () => {
      const output = lowercaseFirstLetter('UPPERCASE');
      expect(output).toBe('uPPERCASE');
    });
    test('addSpacesForEnum', () => {
      const output = addSpacesForEnum('thisIsALowerCaseSentence');
      expect(output).toBe('this Is A Lower Case Sentence');
    });
  });
});
