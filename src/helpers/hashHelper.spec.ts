import 'reflect-metadata';
import { describe, expect, test } from 'vitest';

import { cyrb53 } from './hashHelper';

describe('Hash helper', () => {
  describe('cyrb53', () => {
    test('hash should equal known value', () => {
      const hash = cyrb53('this is a test');
      expect(hash).toBe(7708383209700188);
    });
    test('hash should equal known value(2)', () => {
      const hash = cyrb53("test('hash should equal known value(2)', () => {");
      expect(hash).toBe(8072198893347235);
    });
  });
});
