import 'reflect-metadata';
import { describe, expect, test, vi } from 'vitest';

import { promiseFromResult } from '@helpers/typescriptHacks';
import { ConfigService } from '@services/internal/configService';
import Container from 'typedi';
import { BaseApiService } from './baseApiService';

describe('Base API service', () => {
  class MyService extends BaseApiService {
    getExposed = this.get;
    postExposed = this.post;
    putExposed = this.put;
    deleteExposed = this.delete;
  }
  test('Concatenates path', async () => {
    const mockFetch = vi
      .fn()
      .mockReturnValue(promiseFromResult({ json: () => promiseFromResult({ result: 'test' }) }));
    global.fetch = mockFetch;
    const service = new MyService('https://google.com');
    const result = await service.getExposed('hi');

    expect(result.isSuccess).toBeTruthy();
    expect(mockFetch).toBeCalledWith('https://google.com/hi', {});
  });
  describe('GET', () => {
    test('isSuccess == false on fetch failure', async () => {
      class MockConfigService {
        isProd = () => false;
      }
      Container.set(ConfigService, new MockConfigService());
      global.fetch = vi.fn().mockRejectedValue('tester');
      const service = new MyService('https://google.com');
      const result = await service.getExposed('hi');

      expect(result.isSuccess).toBeFalsy();
    });
    test('isSuccess == false on json failure', async () => {
      class MockConfigService {
        isProd = () => false;
      }
      Container.set(ConfigService, new MockConfigService());
      global.fetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: vi.fn().mockRejectedValue('test') }));
      const service = new MyService('https://google.com');
      const result = await service.getExposed('hi');

      expect(result.isSuccess).toBeFalsy();
    });
    test('manipulateHeaders', async () => {
      const mockFetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: () => promiseFromResult({ result: 'test' }) }));
      global.fetch = mockFetch;
      const service = new MyService('https://google.com');
      const result = await service.getExposed('hi', () => ({ Auth: 'secret' }));

      expect(result.isSuccess).toBeTruthy();
      expect(mockFetch).toBeCalledWith('https://google.com/hi', { Auth: 'secret' });
    });
    test('manipulateResponse', async () => {
      const mockFetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: () => promiseFromResult({ result: 'test' }) }));
      global.fetch = mockFetch;
      const service = new MyService('https://google.com');
      const result = await service.getExposed('hi', undefined, (_) => ({
        isSuccess: true,
        value: 'not test',
        errorMessage: '',
      }));

      expect(result.isSuccess).toBeTruthy();
      expect(result.value).toBe('not test');
    });
  });
  describe('POST', () => {
    test('isSuccess == false on fetch failure', async () => {
      class MockConfigService {
        isProd = () => false;
      }
      Container.set(ConfigService, new MockConfigService());
      global.fetch = vi.fn().mockRejectedValue('tester');
      const service = new MyService('https://google.com');
      const result = await service.postExposed('hi', {});

      expect(result.isSuccess).toBeFalsy();
    });
    test('isSuccess == false on json failure', async () => {
      class MockConfigService {
        isProd = () => false;
      }
      Container.set(ConfigService, new MockConfigService());
      global.fetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: vi.fn().mockRejectedValue('test') }));
      const service = new MyService('https://google.com');
      const result = await service.postExposed('hi', {});

      expect(result.isSuccess).toBeFalsy();
    });
    test('manipulateHeaders', async () => {
      const mockFetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: () => promiseFromResult({ result: 'test' }) }));
      global.fetch = mockFetch;
      const service = new MyService('https://google.com');
      const result = await service.postExposed('hi', {}, () => ({ Auth: 'secret' }));

      expect(result.isSuccess).toBeTruthy();
      expect(mockFetch).toBeCalledWith('https://google.com/hi', {
        Auth: 'secret',
        body: '{}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    });
    test('manipulateResponse', async () => {
      const mockFetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: () => promiseFromResult({ result: 'test' }) }));
      global.fetch = mockFetch;
      const service = new MyService('https://google.com');
      const result = await service.postExposed('hi', {}, undefined, (_) => ({
        isSuccess: true,
        value: 'not test',
        errorMessage: '',
      }));

      expect(result.isSuccess).toBeTruthy();
      expect(result.value).toBe('not test');
    });
  });
  describe('PUT', () => {
    test('isSuccess == false on fetch failure', async () => {
      class MockConfigService {
        isProd = () => false;
      }
      Container.set(ConfigService, new MockConfigService());
      global.fetch = vi.fn().mockRejectedValue('tester');
      const service = new MyService('https://google.com');
      const result = await service.putExposed('hi', {});

      expect(result.isSuccess).toBeFalsy();
    });
    test('isSuccess == false on json failure', async () => {
      class MockConfigService {
        isProd = () => false;
      }
      Container.set(ConfigService, new MockConfigService());
      global.fetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: vi.fn().mockRejectedValue('test') }));
      const service = new MyService('https://google.com');
      const result = await service.putExposed('hi', {});

      expect(result.isSuccess).toBeFalsy();
    });
    test('manipulateHeaders', async () => {
      const mockFetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: () => promiseFromResult({ result: 'test' }) }));
      global.fetch = mockFetch;
      const service = new MyService('https://google.com');
      const result = await service.putExposed('hi', {}, () => ({ Auth: 'secret' }));

      expect(result.isSuccess).toBeTruthy();
      expect(mockFetch).toBeCalledWith('https://google.com/hi', {
        Auth: 'secret',
        body: '{}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      });
    });
    test('manipulateResponse', async () => {
      const mockFetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: () => promiseFromResult({ result: 'test' }) }));
      global.fetch = mockFetch;
      const service = new MyService('https://google.com');
      const result = await service.putExposed('hi', {}, undefined, (_) => ({
        isSuccess: true,
        value: 'not test',
        errorMessage: '',
      }));

      expect(result.isSuccess).toBeTruthy();
      expect(result.value).toBe('not test');
    });
  });
  describe('DELETE', () => {
    test('isSuccess == false on fetch failure', async () => {
      class MockConfigService {
        isProd = () => false;
      }
      Container.set(ConfigService, new MockConfigService());
      global.fetch = vi.fn().mockRejectedValue('tester');
      const service = new MyService('https://google.com');
      const result = await service.deleteExposed('hi');

      expect(result.isSuccess).toBeFalsy();
    });
    test('isSuccess == false on json failure', async () => {
      class MockConfigService {
        isProd = () => false;
      }
      Container.set(ConfigService, new MockConfigService());
      global.fetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: vi.fn().mockRejectedValue('test') }));
      const service = new MyService('https://google.com');
      const result = await service.deleteExposed('hi');

      expect(result.isSuccess).toBeFalsy();
    });
    test('manipulateHeaders', async () => {
      const mockFetch = vi
        .fn()
        .mockReturnValue(promiseFromResult({ json: () => promiseFromResult({ result: 'test' }) }));
      global.fetch = mockFetch;
      const service = new MyService('https://google.com');
      const result = await service.deleteExposed('hi', () => ({ Auth: 'secret' }));

      expect(result.isSuccess).toBeTruthy();
      expect(mockFetch).toBeCalledWith('https://google.com/hi', {
        Auth: 'secret',
        method: 'DELETE',
      });
    });
  });
});
