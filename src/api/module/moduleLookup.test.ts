import { describe, expectTypeOf, test } from 'vitest';

import { IApiModule } from '@api/types/baseModule';
import { segmentLabels } from '@constants/api';
import { moduleLookup } from './moduleLookup';

describe('Module Lookup', () => {
  test('validate that module has expected properties', async () => {
    for (const segment of Object.keys(segmentLabels)) {
      expectTypeOf((moduleLookup as any)[segment]).toMatchTypeOf<IApiModule<any, any, any>>();
    }
  });
});
