import { Container, Service } from 'typedi';

import { api } from '@constants/api';
import { BugReportDto } from '@contracts/dto/forms/bugReportDto';
import { Result } from '@contracts/resultWithValue';
import { getConfig } from '../internal/configService';
import { BaseApiService } from './baseApiService';

@Service()
export class FormBugApiService extends BaseApiService {
  constructor() {
    const apiUrl = getConfig().getNmsUdApiUrl();
    super(apiUrl);
  }

  async submitBugReport(data: BugReportDto): Promise<Result> {
    return this.post(api.routes.bugReport, data);
  }
}

export const getFormBugApiService = () => Container.get(FormBugApiService);
