import 'reflect-metadata';
import { test, describe, expect, vi } from 'vitest';

import { handleRouteLookup } from './handleRouteLookup';
import { apiParams, ApiStatusErrorCode } from '@constants/api';
import { fakePromise } from '@helpers/typescriptHacks';
import { koaRequestHandler } from './types/handlerTypes';
import { IApiModule } from './types/baseModule';

describe('Route lookup', () => {
  test('use handler based on segment in params', async () => {
    let hasRun = false;
    const fakeCtx = {
      set: () => null,
      params: {
        [apiParams.general.segment]: 'builder',
      },
      response: {},
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const fakeHandler = (module: IApiModule<any, any, any>): koaRequestHandler => {
      if ((module as any).update) {
        hasRun = true;
      }

      return vi.fn();
    };
    const routeFunctions: any = handleRouteLookup({
      handlerFunc: fakeHandler,
      module: {
        builder: { update: true } as any,
        community: {} as any,
        planetBuild: {} as any,
      },
    });
    await routeFunctions(fakeCtx, next);
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
    const fakeHandler = vi.fn();
    const routeFunctions: any = handleRouteLookup({
      handlerFunc: fakeHandler,
      module: {
        builder: { update: true } as any,
        community: {} as any,
        planetBuild: {} as any,
      },
    });
    await routeFunctions(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.segmentNotFound.code);
  });
});
