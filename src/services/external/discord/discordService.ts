import { Container, Service } from 'typedi';

import { DiscordWebhook } from '../../../contracts/generated/discordWebhook';
import { DiscordWebhookResponse } from '../../../contracts/generated/discordWebhookResponse';
import { ResultWithValue } from '../../../contracts/resultWithValue';
import { anyObject } from '../../../helper/typescriptHacks';
import { getLog } from '../../internal/logService';

@Service()
export class DiscordService {

    private async discordWebhookExec(
        url: string,
        method: string,
        message: DiscordWebhook,
    ): Promise<ResultWithValue<DiscordWebhookResponse>> {
        try {
            const apiResult = await fetch(`${url}?wait=true`, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
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

    sendDiscordMessage = (url: string, message: DiscordWebhook): Promise<ResultWithValue<DiscordWebhookResponse>> =>
        this.discordWebhookExec(url, 'POST', message);

    updateDiscordMessage = (url: string, messageId: string, message: DiscordWebhook): Promise<ResultWithValue<DiscordWebhookResponse>> =>
        this.discordWebhookExec(`${url}/messages/${messageId}`, 'PATCH', message);
}

export const getDiscordService = () => Container.get(DiscordService);


