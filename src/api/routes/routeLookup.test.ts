import 'reflect-metadata';
import { describe, expectTypeOf, test } from 'vitest';

import { koaRequestHandler } from '@api/types/handlerTypes';
import { segmentLabels } from '@constants/api';
import { formHandlerLookup, statusHandlerLookup, verifyHandlerLookup } from './routeLookup';

describe('RouteLookup', () => {
  test.each([
    [formHandlerLookup],
    [statusHandlerLookup],
    [verifyHandlerLookup], //
  ])('validate that %s has expected properties', (lookup) => {
    for (const segment of Object.keys(segmentLabels)) {
      expectTypeOf((lookup as any)[segment]).toMatchTypeOf<koaRequestHandler>();
    }
  });
});
