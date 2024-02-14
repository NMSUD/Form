import { Container, Service } from 'typedi';

import { GithubWorkflowRunResponse } from '@contracts/generated/githubWorkflowRunResponse';
import { Result, ResultWithValue } from '@contracts/resultWithValue';
import { addMinutes } from '@helpers/dateHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { getConfig } from '../internal/configService';
import { getLog } from '../internal/logService';

@Service()
export class GithubWorkflowService {
  private _baseUrl = 'https://api.github.com';

  private async _createGithubRequest<T>(props: {
    method: string;
    url: string;
    authToken: string;
    body?: string;
  }): Promise<ResultWithValue<T>> {
    try {
      const apiResult = await fetch(props.url, {
        method: props.method,
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: `Bearer ${props.authToken}`,
        },
        body: props.body,
      });

      const responseBody: T = await apiResult.json();

      getLog().i(`GithubWorkflowService createGithubRequest status: ${apiResult.status}`);
      return {
        isSuccess: true,
        value: responseBody,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `GithubWorkflowService - createGithubRequest: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        errorMessage: errMsg,
        value: anyObject,
      };
    }
  }

  async createDispatchEvent(): Promise<Result> {
    const owner = getConfig().getGithubActionOwner();
    const repo = getConfig().getGithubActionRepo();
    const workflowId = getConfig().getGithubActionWorkflowId();
    const authToken = getConfig().getGithubActionAuthToken();

    const url = `${this._baseUrl}/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`;
    const requestResult = await this._createGithubRequest({
      method: 'POST',
      authToken,
      url,
      body: JSON.stringify({
        ref: 'main',
      }),
    });
    return requestResult;
  }

  async getWorkflowRuns(): Promise<ResultWithValue<GithubWorkflowRunResponse>> {
    const owner = getConfig().getGithubActionOwner();
    const repo = getConfig().getGithubActionRepo();
    const workflowId = getConfig().getGithubActionWorkflowId();
    const authToken = getConfig().getGithubActionAuthToken();

    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`;
    const requestResult = await this._createGithubRequest<GithubWorkflowRunResponse>({
      method: 'GET',
      authToken,
      url,
    });
    return requestResult;
  }

  async triggerWorkflowIfNotRunRecently(): Promise<Result> {
    const shouldTrigger = getConfig().getGithubActionTriggerOnDecision();
    if (shouldTrigger == false) {
      getLog().w('Github Action trigger disabled, not going to trigger a run');
      return { isSuccess: true, errorMessage: '' };
    }

    const minBetweenRuns = getConfig().getGithubActionMinBetweenRuns();

    const runsResult = await this.getWorkflowRuns();
    if (runsResult.isSuccess == false) return runsResult;

    const latestDateAllowed = addMinutes(new Date(), -minBetweenRuns);
    const runsAfterDate = runsResult.value.workflow_runs.filter(
      (rs) => rs.run_started_at > latestDateAllowed,
    );
    if (runsAfterDate.length > 0) {
      getLog().w('There was a previous GithubWorkflow run that is too recent, skipping this run');
      return { isSuccess: true, errorMessage: '' };
    }

    return this.createDispatchEvent();
  }
}

export const getGithubWorkflowService = () => Container.get(GithubWorkflowService);
