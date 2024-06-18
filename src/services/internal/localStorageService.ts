import { Container, Service } from 'typedi';
import { LocalStorageKey } from '@constants/site';
import { getLog } from './logService';

@Service()
export class LocalStorageService {
  get = <T>(key: string): T | null => {
    const dataStr = localStorage.getItem(key);
    if (dataStr == null) return null;
    try {
      const obj = JSON.parse(dataStr || '{}');
      return obj;
    } catch (err) {
      getLog().e('LocalStorageService get', err);
      return null;
    }
  };

  set = <T>(key: string, value: T): void => {
    try {
      const valueStr = JSON.stringify(value);
      localStorage.setItem(key, valueStr);
    } catch (err) {
      getLog().e('LocalStorageService set', err);
    }
  };

  removeAllTrackedKeys = () => {
    const ownKeys: Array<string> = [];
    for (const localKey in LocalStorageKey) {
      if (Object.prototype.hasOwnProperty.call(LocalStorageKey, localKey)) {
        ownKeys.push((LocalStorageKey as { [prop: string]: string })[localKey]);
      }
    }

    for (const key in localStorage) {
      if (ownKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    }
  };
}

export const getLocalStorage = () => Container.get(LocalStorageService);
