import { test, describe, expect } from 'vitest';

import { makeArrayOrDefault } from './arrayHelper';
import { formatDate } from './dateHelper';
import { onTargetFile, onTargetValue, preventDefault } from './eventHelper';
import { addSpacesForEnum, capitalizeFirstLetter, lowercaseFirstLetter } from './stringHelper';
import { timeout } from './asyncHelper';

describe('Helper tests', () => {
  describe('async helper', () => {
    test('timeout', async () => {
      const startTime = performance.now();
      await timeout(200);
      const endTime = performance.now();
      const numMilli = (endTime - startTime) / 100; // 100ms wiggle room because node is not very accurate
      expect(Math.round(numMilli)).toBe(2);
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
