import { describe, expect, test } from 'vitest';

import { hasValidPortalCharacters } from './portalValidation';

describe('Portal Validation', () => {
  test('null value', () => {
    const portalCodes: any = null;
    const validator = hasValidPortalCharacters;
    expect(validator(portalCodes).isValid).toBeFalsy();
  });
  test('invalid chars', () => {
    const portalCodes = 'asdfghjk';
    const validator = hasValidPortalCharacters;
    expect(validator(portalCodes).isValid).toBeFalsy();
  });
  test('valid chars', () => {
    const portalCodes = '1234567890abcdef';
    const validator = hasValidPortalCharacters;
    expect(validator(portalCodes).isValid).toBeTruthy();
  });
});
