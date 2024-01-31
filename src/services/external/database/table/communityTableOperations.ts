import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { IFormResponse } from '@contracts/response/formResponse';
import { Result, ResultWithValue } from '@contracts/resultWithValue';
import { anyObject } from '@helpers/typescriptHacks';
import { getLog } from '../../../internal/logService';
import { Community, CommunityRecord, XataClient } from '../xata';

export const readCommunity = async (
  xata: XataClient,
  id: string,
): Promise<ResultWithValue<CommunityRecord>> => {
  try {
    const record = await xata.db.community.read(id);

    if (record == null) {
      throw `getCommunitySubmission - Record not found for (${id})`;
    }

    return {
      isSuccess: true,
      value: record,
      errorMessage: '',
    };
  } catch (ex) {
    return {
      isSuccess: false,
      value: anyObject,
      errorMessage: ex?.toString?.() ?? 'error occurred while creating record in database',
    };
  }
};

export const createCommunity = async (
  xata: XataClient,
  persistence: Omit<Community, 'id'>,
): Promise<ResultWithValue<IFormResponse>> => {
  try {
    const newRecordCreated = await xata.db.community.create({
      ...persistence,
      approvalStatus: ApprovalStatus.pending,
    });
    return {
      isSuccess: true,
      value: {
        id: newRecordCreated.id,
        name: newRecordCreated.name,
      },
      errorMessage: '',
    };
  } catch (ex) {
    return {
      isSuccess: false,
      value: anyObject,
      errorMessage: ex?.toString?.() ?? 'error occurred while creating record in database',
    };
  }
};

export const updateWebhookIdCommunity = async (
  xata: XataClient,
  recordId: string,
  webhookMessageId: string,
): Promise<Result> => {
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

export const updateApprovalStatusCommunity = async (
  xata: XataClient,
  recordId: string,
  approvalStatus: ApprovalStatus,
): Promise<Result> => {
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
