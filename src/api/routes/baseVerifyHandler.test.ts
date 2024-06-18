import 'reflect-metadata';
import { describe, expect, test, vi } from 'vitest';
import Container from 'typedi';

import { fakeModule } from '@api/types/baseModule.test';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { anyObject, fakePromise, promiseFromResult } from '@helpers/typescriptHacks';
import { ConfigService } from '@services/internal/configService';
import { baseVerifyHandler } from './baseVerifyHandler';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { GithubWorkflowService } from '@services/external/githubWorkflowService';
import { DiscordService } from '@services/external/discord/discordService';

describe('Verify handler', () => {
  test('invalid decision params', async () => {
    const ctx: any = {
      set: () => null,
      params: {
        [apiParams.status.id]: 'tester',
        [apiParams.verify.decision]: 'tester',
        [apiParams.verify.check]: 'tester',
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseVerifyHandler(fakeModule);
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(ApiStatusErrorCode.decisionNotFound.code);
  });
  test('record not found', async () => {
    const ctx: any = {
      set: () => null,
      redirect: () => null,
      params: {
        [apiParams.status.id]: 'tester',
        [apiParams.verify.decision]: 'approved',
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseVerifyHandler({
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
    expect(ctx.response.status).toBe(303);
    expect(ctx.response.body).toBe(ApiStatusErrorCode.recordNotFound.code);
  });
  test('setting approval status the same as already in db', async () => {
    class MockConfigService {
      getNmsUdFormWebUrl = () => 'https://nmsud.com/imgs';
    }
    Container.set(ConfigService, new MockConfigService());
    const ctx: any = {
      set: () => null,
      redirect: () => null,
      params: {
        [apiParams.status.id]: 'tester',
        [apiParams.verify.decision]: 'approved',
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseVerifyHandler({
      ...fakeModule,
      readRecord: (id) => {
        return promiseFromResult({
          isSuccess: true,
          value: {
            id,
            testP: 'readFromDb',
            approvalStatus: ApprovalStatus.approved,
          },
          errorMessage: '',
        });
      },
    });
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(303);
    expect(ctx.response.body).toBe(200);
  });
  test('invalid check supplied', async () => {
    class MockConfigService {
      getNmsUdFormWebUrl = () => 'https://nmsud.com/imgs';
    }
    Container.set(ConfigService, new MockConfigService());
    const ctx: any = {
      set: () => null,
      redirect: () => null,
      params: {
        [apiParams.status.id]: 'tester',
        [apiParams.verify.decision]: 'approved',
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseVerifyHandler(fakeModule);
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(303);
    expect(ctx.response.body).toBe(ApiStatusErrorCode.calculatedCheckFailed.code);
  });
  test('valid check updates record', async () => {
    class MockConfigService {
      getNmsUdFormWebUrl = () => 'https://nmsud.com/imgs';
    }
    Container.set(ConfigService, new MockConfigService());
    const ctx: any = {
      set: () => null,
      redirect: () => null,
      params: {
        [apiParams.status.id]: 'tester',
        [apiParams.verify.decision]: 'approved',
        [apiParams.verify.check]: 1234,
      },
      response: {
        status: 200,
      },
    };
    const updateRecord = vi.fn().mockResolvedValue(
      promiseFromResult({
        isSuccess: false,
      }),
    );
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseVerifyHandler({
      ...fakeModule,
      updateRecord,
    });
    await formHandler(ctx, next);
    expect(updateRecord).toBeCalled();
  });
  test('return earlier if could not persist data', async () => {
    class MockConfigService {
      getNmsUdFormWebUrl = () => 'https://nmsud.com/imgs';
    }
    Container.set(ConfigService, new MockConfigService());
    const ctx: any = {
      set: () => null,
      redirect: () => null,
      params: {
        [apiParams.status.id]: 'tester',
        [apiParams.verify.decision]: 'approved',
        [apiParams.verify.check]: 1234,
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseVerifyHandler({
      ...fakeModule,
      updateRecord: () => {
        return promiseFromResult({
          isSuccess: false,
          value: {
            id: '',
            testP: 'readFromDb',
            approvalStatus: ApprovalStatus.approved,
          },
          errorMessage: '',
        });
      },
    });
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(303);
    expect(ctx.response.body).toBe(ApiStatusErrorCode.couldNotPersistData.code);
  });
  test('runs mapRecordRelationshipsToDto', async () => {
    class MockConfigService {
      getNmsUdFormWebUrl = () => 'https://nmsud.com/imgs';
    }
    class MockGithubWorkflowService {
      triggerWorkflowIfNotRunRecently = () => Promise<void>;
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(GithubWorkflowService, new MockGithubWorkflowService());
    const ctx: any = {
      set: () => null,
      redirect: () => null,
      params: {
        [apiParams.status.id]: 'tester',
        [apiParams.verify.decision]: 'approved',
        [apiParams.verify.check]: 1234,
      },
      response: {
        status: 200,
      },
    };
    const mapRecordRelationshipsToDto = vi.fn().mockResolvedValue(
      promiseFromResult({
        isSuccess: false,
      }),
    );
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseVerifyHandler({
      ...fakeModule,
      mapRecordRelationshipsToDto,
    });
    await formHandler(ctx, next);
    expect(mapRecordRelationshipsToDto).toBeCalled();
  });
  test('updates discord message when messageId is in db', async () => {
    const updateDiscordMessage = vi.fn().mockResolvedValue(fakePromise());
    class MockConfigService {
      getNmsUdFormWebUrl = () => 'https://nmsud.com/imgs';
      getDiscordWebhookUrl = () => 'https://discord.com/webhook';
    }
    class MockGithubWorkflowService {
      triggerWorkflowIfNotRunRecently = () => Promise<void>;
    }
    class MockDiscordService {
      updateDiscordMessage = updateDiscordMessage;
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(GithubWorkflowService, new MockGithubWorkflowService());
    Container.set(DiscordService, new MockDiscordService());
    const ctx: any = {
      set: () => null,
      redirect: () => null,
      params: {
        [apiParams.status.id]: 'tester',
        [apiParams.verify.decision]: 'approved',
        [apiParams.verify.check]: 1234,
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseVerifyHandler({
      ...fakeModule,
      readRecord: (id: string) => {
        return promiseFromResult({
          isSuccess: true,
          value: {
            id,
            testP: 'readFromDb',
            discordWebhookId: '',
            approvalStatus: ApprovalStatus.pending,
          },
          errorMessage: '',
        });
      },
    });
    await formHandler(ctx, next);
    expect(updateDiscordMessage).toBeCalled();
  });
  test('returns 303 on success', async () => {
    class MockConfigService {
      getNmsUdFormWebUrl = () => 'https://nmsud.com/imgs';
    }
    class MockGithubWorkflowService {
      triggerWorkflowIfNotRunRecently = () => Promise<void>;
    }
    Container.set(ConfigService, new MockConfigService());
    Container.set(GithubWorkflowService, new MockGithubWorkflowService());
    const ctx: any = {
      set: () => null,
      redirect: () => null,
      params: {
        [apiParams.status.id]: 'tester',
        [apiParams.verify.decision]: 'approved',
        [apiParams.verify.check]: 1234,
      },
      response: {
        status: 200,
      },
    };
    const next = vi.fn().mockResolvedValue(fakePromise());
    const formHandler = baseVerifyHandler(fakeModule);
    await formHandler(ctx, next);
    expect(ctx.response.status).toBe(303);
  });
});
