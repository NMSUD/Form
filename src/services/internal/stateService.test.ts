import { describe, expect, test, vi } from 'vitest';
import Container from 'typedi';

import { StateService } from './stateService';
import { LocalStorageService } from './localStorageService';

describe('LocalStorage service', () => {
  describe('submission', () => {
    test('add submission', () => {
      class MockLocalStorageService {
        get = () => ({ submissions: { builder: 'tester' } });
      }
      Container.set(LocalStorageService, new MockLocalStorageService());

      const stateService = new StateService();
      expect(stateService.getSubmissions('builder')).toBe('tester');
    });
    test('add submission', () => {
      const set = vi.fn().mockResolvedValue({});
      class MockLocalStorageService {
        set = set;
        get = () => {};
      }
      Container.set(LocalStorageService, new MockLocalStorageService());

      const newBuilder = {
        title: 'test',
        value: '1',
      };
      const stateService = new StateService();
      stateService.saveToLocalStorage = vi.fn();
      stateService.addSubmission('builder', newBuilder);
      expect(stateService.saveToLocalStorage).toBeCalledWith({
        submissions: {
          community: [],
          builder: [newBuilder],
          planetBase: [],
        },
        form: {
          community: null,
          builder: null,
          planetBase: null,
        },
      });
    });
    test('delete submission', () => {
      const set = vi.fn().mockResolvedValue({});
      class MockLocalStorageService {
        set = set;
        get = () => {};
      }
      Container.set(LocalStorageService, new MockLocalStorageService());

      const newBuilder = (id: string) => ({
        title: 'test',
        value: id,
      });
      const stateService = new StateService();
      stateService.addSubmission('builder', newBuilder('test'));
      stateService.addSubmission('builder', newBuilder('tester'));
      stateService.addSubmission('builder', newBuilder('test3r'));
      stateService.delSubmission('builder', 'test3r');
      expect(stateService.getSubmissions('builder').length).toBe(2);
    });
  });

  describe('form', () => {
    test('set & get', () => {
      const set = vi.fn().mockResolvedValue({});
      class MockLocalStorageService {
        set = set;
        get = () => {};
      }
      Container.set(LocalStorageService, new MockLocalStorageService());

      const newBuilder = (id: string) => ({
        title: 'test',
        value: id,
      });
      const stateService = new StateService();
      stateService.setForm('builder', newBuilder('test'));
      expect(stateService.getForm('builder')).toStrictEqual({
        title: 'test',
        value: 'test',
      });
    });
  });
});
