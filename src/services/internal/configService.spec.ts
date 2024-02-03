import { describe, expect, test } from 'vitest';

import { ConfigService } from '../internal/configService';

describe('Config service', () => {
  test('can access process variables', () => {
    const configService = new ConfigService();
    expect(configService.get('TEST')).toBe('true');
  });
});
