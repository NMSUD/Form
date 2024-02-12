import { Container, Service } from 'typedi';

import { Result } from '@contracts/resultWithValue';
import { getConfig } from '../internal/configService';
import { getLog } from '../internal/logService';

@Service()
export class GithubWorkflowService {
  async createDispatchEvent(): Promise<Result> {
    const apiUrl = getConfig().getGithubActionFormDataUrl();
    const authToken = getConfig().getGithubActionAuthToken();

    try {
      const apiResult = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          ref: 'main',
        }),
      });

      getLog().i(`GithubWorkflowService createDispatchEvent status: ${apiResult.status}`);
      return {
        isSuccess: true,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `GithubWorkflowService - createDispatchEvent: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        errorMessage: errMsg,
      };
    }
  }
}

export const getGithubWorkflowService = () => Container.get(GithubWorkflowService);
