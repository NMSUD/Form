import { Container, Service } from 'typedi';

import { DiscordWebhook } from '@contracts/generated/discordWebhook';
import { DiscordWebhookResponse } from '@contracts/generated/discordWebhookResponse';
import { ResultWithValue } from '@contracts/resultWithValue';
import { anyObject } from '@helpers/typescriptHacks';
import { getLog } from '../../internal/logService';

@Service()
export class DiscordService {
  private async discordWebhookExec<T>(
    url: string,
    method: string,
    message?: string,
  ): Promise<ResultWithValue<T>> {
    try {
      const apiResult = await fetch(`${url}?wait=true`, {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: message,
      });

      const temp = await apiResult.json();
      return {
        isSuccess: true,
        errorMessage: '',
        value: temp,
      };
    } catch (ex) {
      const errMsg = `DiscordService - discordWebhookExec: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        errorMessage: errMsg,
        value: anyObject,
      };
    }
  }

  getDiscordMessage = (url: string, messageId: string): Promise<ResultWithValue<DiscordWebhook>> =>
    this.discordWebhookExec(`${url}/messages/${messageId}`, 'GET');

  sendDiscordMessage = (
    url: string,
    message: DiscordWebhook,
  ): Promise<ResultWithValue<DiscordWebhookResponse>> =>
    this.discordWebhookExec(url, 'POST', JSON.stringify(message));

  updateDiscordMessage = (
    url: string,
    messageId: string,
    message: DiscordWebhook,
  ): Promise<ResultWithValue<DiscordWebhookResponse>> =>
    this.discordWebhookExec(`${url}/messages/${messageId}`, 'PATCH', JSON.stringify(message));
}

export const getDiscordService = () => Container.get(DiscordService);
