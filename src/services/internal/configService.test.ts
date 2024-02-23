import { describe, expect, test } from 'vitest';

import { ConfigService } from './configService';

describe('Config service', () => {
  test('can access process variables', () => {
    const configService = new ConfigService();
    expect(configService.get('TEST')).toBe('true');
  });
  test('returns empty string if not exists', () => {
    const configService = new ConfigService();
    expect(configService.get('FAKE')).toBe('');
  });
  test('returns default if not exists', () => {
    const configService = new ConfigService();
    expect(configService.get('FAKE', 'yes')).toBe('yes');
  });
});
