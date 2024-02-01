import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { Result } from '@contracts/resultWithValue';
import { getLog } from '../../../internal/logService';
import { XataClient } from '../xata';

export const updateWebhookIdCommunity =
  (xata: XataClient) =>
  async (recordId: string, webhookMessageId: string): Promise<Result> => {
    try {
      await xata.db.community.update(recordId, {
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

export const updateApprovalStatusCommunity =
  (xata: XataClient) =>
  async (recordId: string, approvalStatus: ApprovalStatus): Promise<Result> => {
    try {
      await xata.db.community.update(recordId, {
        approvalStatus: approvalStatus,
      });
      return {
        isSuccess: true,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `updateApprovalStatusCommunity: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        errorMessage: errMsg,
      };
    }
  };
