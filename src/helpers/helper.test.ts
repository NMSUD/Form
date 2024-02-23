import { test, describe, expect } from 'vitest';

import { makeArrayOrDefault } from './arrayHelper';
import { formatDate } from './dateHelper';
import { onTargetFile, onTargetValue, preventDefault } from './eventHelper';
import { addSpacesForEnum, capitalizeFirstLetter, lowercaseFirstLetter } from './stringHelper';
import { timeout } from './asyncHelper';
import { promiseFromResult } from './typescriptHacks';
import { randomIntFromRange, randomItemFromArray } from './randomHelper';
import { nameof } from './propHelper';

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

  describe('prop helper', () => {
    test('nameof', () => {
      const testObj = {
        test: 'teste',
        tester: 'teste',
        testest: 'teste',
      };
      expect(nameof<typeof testObj>('testest')).toBe('testest');
    });
  });

  describe('Random helper', () => {
    test.each([[], [], []])('randomIntFromRange', () => {
      const min = 1;
      const max = 10;
      const output = randomIntFromRange(min + 1, max);
      expect(output).toBeLessThan(max);
      expect(output).toBeGreaterThan(min);
    });
    test.each([[], [], []])('randomItemFromArray', () => {
      const items = ['test1', 'test2', 'test3'];
      const output = randomItemFromArray(items);
      expect(items.includes(output)).toBeTruthy();
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

  describe('typescript hacks', () => {
    test('promiseFromResult', async () => {
      const obj = {
        a: '1',
        b: 'test',
      };
      const fakePromise = promiseFromResult(obj);
      const result = await fakePromise;
      expect(result).toBe(obj);
    });
  });
});
