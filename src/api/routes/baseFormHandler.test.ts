import 'reflect-metadata';
import { describe, expect, test, vi } from 'vitest';

import { fakeModule } from '@api/types/baseModule.test';
import { ApiStatusErrorCode } from '@constants/api';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { FormDataKey } from '@constants/form';
import { fakePromise, promiseFromResult } from '@helpers/typescriptHacks';
import { DiscordService } from '@services/external/discord/discordService';
import { ConfigService } from '@services/internal/configService';
import Container from 'typedi';
import { baseFormHandler } from './baseFormHandler';

describe('Form handler', () => {
  test('invalid captcha', async () => {
    class MockConfigService {
      isProd = () => true;
      getCaptchaEnabled = () => true;
    }
    Container.set(ConfigService, new MockConfigService());
    const ctx: any = {
      get: () => null,
      set: () => null,
      request: {
        [FormDataKey.captcha]: 'bad captcha',
        [FormDataKey.data]: '',
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseFormHandler(fakeModule);
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.badCaptcha.code);
  });
  test('error handling files', async () => {
    class MockConfigService {
      getCaptchaEnabled = () => false;
    }
    Container.set(ConfigService, new MockConfigService());

    const ctx: any = {
      get: () => null,
      set: () => null,
      request: {
        [FormDataKey.data]: '',
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseFormHandler({
      ...fakeModule,
      handleFilesInFormData: (_) => {
        return promiseFromResult({
          isSuccess: false,
          value: {
            testFile: 'handledFile',
          },
          errorMessage: '',
        });
      },
    });
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.invalidFormFiles.code);
  });
  test('invalid json in form request', async () => {
    class MockConfigService {
      getCaptchaEnabled = () => false;
    }
    Container.set(ConfigService, new MockConfigService());

    const ctx: any = {
      get: () => null,
      set: () => null,
      request: {
        body: { [FormDataKey.data]: '{' },
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseFormHandler(fakeModule);
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.invalidFormData.code);
  });
  test('errors return on form validation', async () => {
    class MockConfigService {
      getCaptchaEnabled = () => false;
    }
    Container.set(ConfigService, new MockConfigService());

    const ctx: any = {
      get: () => null,
      set: () => null,
      request: {
        body: { [FormDataKey.data]: '{ "test": "bob" }' },
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseFormHandler(fakeModule);
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.validation.code);
  });
  test('errors return on failure to create persistence', async () => {
    class MockConfigService {
      getCaptchaEnabled = () => false;
    }
    Container.set(ConfigService, new MockConfigService());

    const ctx: any = {
      get: () => null,
      set: () => null,
      request: {
        body: { [FormDataKey.data]: '{ "test": "test" }' },
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseFormHandler({
      ...fakeModule,
      createRecord: (persistence) => {
        return promiseFromResult({
          isSuccess: false,
          value: {
            ...persistence,
            id: 'createdId',
            approvalStatus: ApprovalStatus.pending,
          },
          errorMessage: '',
        });
      },
    });
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.couldNotPersistData.code);
  });
  test('errors return on failure to create persistence relationships', async () => {
    class MockConfigService {
      getCaptchaEnabled = () => false;
      getNmsUdApiUrl = () => 'https://nmsud.com';
      getDiscordWebhookUrl = () => 'https://fakeurlformocking.com';
    }
    class MockDiscordService {
      sendDiscordMessage = () => ({ isSuccess: false });
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(DiscordService, new MockDiscordService());

    const ctx: any = {
      get: () => null,
      set: () => null,
      request: {
        body: { [FormDataKey.data]: '{ "test": "test" }' },
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseFormHandler({
      ...fakeModule,
      createRecordRelationships: () => {
        return promiseFromResult({
          isSuccess: false,
          errorMessage: '',
        });
      },
    });
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.couldNotPersistData.code);
  });
  test('only use mapRecordRelationshipsToDto if provided', async () => {
    class MockConfigService {
      getCaptchaEnabled = () => false;
      getNmsUdApiUrl = () => 'https://nmsud.com';
      getDiscordWebhookUrl = () => 'https://fakeurlformocking.com';
    }
    class MockDiscordService {
      sendDiscordMessage = () => ({ isSuccess: false });
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(DiscordService, new MockDiscordService());

    const ctx: any = {
      get: () => null,
      set: () => null,
      request: {
        body: { [FormDataKey.data]: '{ "test": "test" }' },
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const fakeMapRecordRelationshipsToDto = vi.fn().mockResolvedValue(
      promiseFromResult({
        isSuccess: false,
        value: { test: 'bob' },
        errorMessage: '',
      }),
    );
    const formHandler = baseFormHandler({
      ...fakeModule,
      mapRecordRelationshipsToDto: fakeMapRecordRelationshipsToDto,
    });
    await formHandler(ctx, next);
    expect(fakeMapRecordRelationshipsToDto).toBeCalledTimes(1);
  });
  test('discord message sent, update messageId in db', async () => {
    class MockConfigService {
      getCaptchaEnabled = () => false;
      getNmsUdApiUrl = () => 'https://nmsud.com';
      getDiscordWebhookUrl = () => 'https://fakeurlformocking.com';
    }
    class MockDiscordService {
      sendDiscordMessage = () => ({ isSuccess: true, value: { id: 'test' } });
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(DiscordService, new MockDiscordService());

    const ctx: any = {
      get: () => null,
      set: () => null,
      request: {
        body: { [FormDataKey.data]: '{ "test": "test" }' },
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const fakeUpdateRecord = vi.fn().mockResolvedValue(
      promiseFromResult({
        isSuccess: false,
        value: { test: 'bob' },
        errorMessage: '',
      }),
    );
    const formHandler = baseFormHandler({
      ...fakeModule,
      sendDiscordMessageOnSubmission: true,
      updateRecord: fakeUpdateRecord,
    });
    await formHandler(ctx, next);
    expect(fakeUpdateRecord).toBeCalledTimes(1);
  });
  test('discord message not sent but still return successful response', async () => {
    class MockConfigService {
      getCaptchaEnabled = () => false;
      getNmsUdApiUrl = () => 'https://nmsud.com';
      getDiscordWebhookUrl = () => 'https://fakeurlformocking.com';
    }
    class MockDiscordService {
      sendDiscordMessage = () => ({ isSuccess: false });
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(DiscordService, new MockDiscordService());

    const ctx: any = {
      get: () => null,
      set: () => null,
      request: {
        body: { [FormDataKey.data]: '{ "test": "test" }' },
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseFormHandler(fakeModule);
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(200);
  });
});
