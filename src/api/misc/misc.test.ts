import 'reflect-metadata';
import { test, describe, expect, vi } from 'vitest';

import { defaultEndpoint, versionEndpoint } from './misc';
import { apiParams, ApiStatusErrorCode } from '@constants/api';
import { fakePromise } from '@helpers/typescriptHacks';

describe('Misc endpoints', () => {
  test('default endpoint returns 200 OK', async () => {
    const ctx: any = {
      response: {},
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    await defaultEndpoint(ctx, next);
    expect(ctx.response.status).toBe(200);
  });
  test('version endpoint with correct authToken', async () => {
    const authToken = 'testertest';
    const ctx: any = {
      get: () => authToken,
      response: {},
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const versionEndpointFunc = versionEndpoint(authToken);
    await versionEndpointFunc(ctx, next);
    expect(ctx.body).toContain('TEST');
  });
  test('version endpoint without correct authToken', async () => {
    const authToken = 'testertest';
    const ctx: any = {
      get: () => null,
      response: {},
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const versionEndpointFunc = versionEndpoint(authToken);
    await versionEndpointFunc(ctx, next);
    expect(ctx.body).toContain('packageVersion');
  });
  // test('handler not found based on segment in params', async () => {
  //   const ctx: any = {
  //     get: () => null,
  //     set: () => null,
  //     response: {
  //       status: 200,
  //     },
  //     params: {
  //       [apiParams.general.segment]: 'builderTest',
  //     },
  //   };
  //   const next = vi.fn().mockResolvedValue(fakePromise());
  //   const routeFunctions: any = handleRouteLookup({
  //     communityTest: () => {},
  //   });
  //   await routeFunctions(ctx, next);
  //   expect(ctx.response.status).toBe(ApiStatusErrorCode.segmentNotFound);
  // });
});
