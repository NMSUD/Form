import { Result } from '@contracts/resultWithValue';
import { getLog } from '../../../internal/logService';
import { XataClient } from '../xata';

export const updateWebhookIdBuilder =
  (xata: XataClient) =>
  async (recordId: string, webhookMessageId: string): Promise<Result> => {
    try {
      await xata.db.builder.update(recordId, {
        discordWebhookId: webhookMessageId,
      });
      return {
        isSuccess: true,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `updateWebhookIdCommunity: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        errorMessage: errMsg,
      };
    }
  };
