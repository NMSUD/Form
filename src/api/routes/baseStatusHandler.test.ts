import 'reflect-metadata';
import { describe, expect, test, vi } from 'vitest';

import { fakeModule } from '@api/types/baseModule.test';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { anyObject, fakePromise, promiseFromResult } from '@helpers/typescriptHacks';
import { baseStatusHandler } from './baseStatusHandler';

describe('Status handler', () => {
  test('record not found', async () => {
    const ctx: any = {
      set: () => null,
      params: {
        [apiParams.status.id]: 'tester',
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseStatusHandler({
      ...fakeModule,
      readRecord: () => {
        return promiseFromResult({
          isSuccess: false,
          value: anyObject,
          errorMessage: '',
        });
      },
    });
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.recordNotFound);
  });
  test('record found', async () => {
    const ctx: any = {
      set: () => null,
      params: {
        [apiParams.status.id]: 'tester',
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseStatusHandler(fakeModule);
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(200);
  });
});
