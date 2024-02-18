import 'reflect-metadata';
import { describe, expect, test, vi } from 'vitest';

import { fakePromise } from '../../helpers/typescriptHacks';
import { isRequestAuthed } from './hasAuth';

describe('has Auth', () => {
  test('Unauthorized on header mismatch', async () => {
    const ctx: any = {
      get: () => null,
    };
    const next = vi.fn().mockResolvedValue(fakePromise());

    const isAuthed = await isRequestAuthed('tester', ctx, next);
    expect(isAuthed).toBeFalsy();
    expect(ctx.body).toContain('Unauthorized');
  });
  test('isAuthed on header match', async () => {
    const authToken = 'tester';
    const ctx: any = {
      get: () => authToken,
    };
    const next = vi.fn().mockResolvedValue(fakePromise());

    const isAuthed = await isRequestAuthed(authToken, ctx, next);
    expect(isAuthed).toBeTruthy();
  });
});
