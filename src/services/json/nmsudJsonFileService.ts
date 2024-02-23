import { Container, Service } from 'typedi';

import { IApiSegment } from '@constants/api';
import { ResultWithValue } from '@contracts/resultWithValue';
import { BaseApiService } from '@services/api/baseApiService';
import { getConfig } from '../internal/configService';

@Service()
export class NmsUdJsonFileService extends BaseApiService {
  constructor() {
    const nmsUdFormDataUrl = getConfig().getNmsUdFormDataUrl();
    super(nmsUdFormDataUrl);
  }

  async getListOf<T>(segment: keyof IApiSegment): Promise<ResultWithValue<Array<T>>> {
    const url = `${segment}.json`;
    return this.get<Array<T>>(url);
  }
}

export const getNmsUdJsonFileService = () => Container.get(NmsUdJsonFileService);
