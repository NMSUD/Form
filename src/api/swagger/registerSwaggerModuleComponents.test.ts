import { describe, expect, test, vi } from 'vitest';

import { registerSwaggerModuleComponents } from './registerSwaggerModuleComponents';

describe('Swagger module components', () => {
  test('registers components based on modules', async () => {
    const addComponent = vi.fn();
    const swaggerBuilder: any = {
      addComponent,
    };
    registerSwaggerModuleComponents({
      swaggerBuilder,
    });
    expect(addComponent).toBeCalledTimes(3);
  });
});
