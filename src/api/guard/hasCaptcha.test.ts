import 'reflect-metadata';
import Container from 'typedi';
import { describe, expect, test, vi } from 'vitest';

import { CaptchaService } from '@services/external/captchaService';
import { fakePromise, promiseFromResult } from '../../helpers/typescriptHacks';
import { hasCaptcha } from './hasCaptcha';

describe('has Captcha', () => {
  test('Unauthorized on invalid token', async () => {
    const ctx: any = {
      get: () => null,
      set: () => null,
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());

    const handler = hasCaptcha('tester');
    const isAuthed = await handler(ctx, next);
    expect(isAuthed).toBeFalsy();
    expect(ctx.body).toContain('Captcha - not supplied');
  });
  test('isAuthed on header mismatch', async () => {
    class MockCaptchaService {
      loadUI = vi.fn();
      promptUser = vi.fn();
      verifyToken = vi.fn().mockResolvedValue(
        promiseFromResult({
          isSuccess: true,
          errorMessage: '',
        }),
      );
    }
    Container.set(CaptchaService, new MockCaptchaService());
    const authToken = 'tester';
    const ctx: any = {
      get: () => authToken,
    };
    const next = vi.fn().mockResolvedValue(fakePromise());

    const handler = hasCaptcha('testertester');
    const isAuthed = await handler(ctx, next);
    expect(isAuthed).toBeTruthy();
  });
});
