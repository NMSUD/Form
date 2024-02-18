import 'reflect-metadata';
import { test, describe, expect, vi } from 'vitest';

import { handleRouteLookup } from './handleRouteLookup';
import { apiParams, ApiStatusErrorCode } from '@constants/api';
import { fakePromise } from '@helpers/typescriptHacks';

describe('Route lookup', () => {
  test('use handler based on segment in params', async () => {
    let hasRun = false;
    const fakeDoNothing: any = () => {};
    const fakeCtx = {
      params: {
        [apiParams.general.segment]: 'builderTest',
      },
    };
    const fakeNextPromise = new Promise((res, _) => res(''));
    const routeFunctions: any = handleRouteLookup({
      communityTest: fakeDoNothing,
      builderTest: async () => {
        hasRun = true;
      },
    });
    await routeFunctions(fakeCtx, fakeNextPromise);
    expect(hasRun).toBeTruthy();
  });
  test('handler not found based on segment in params', async () => {
    const ctx: any = {
      get: () => null,
      set: () => null,
      response: {
        status: 200,
      },
      params: {
        [apiParams.general.segment]: 'builderTest',
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const routeFunctions: any = handleRouteLookup({
      communityTest: () => {},
    });
    await routeFunctions(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.segmentNotFound);
  });
});
