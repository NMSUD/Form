
import { ApprovalStatus } from "../../../../constants/enum/approvalStatus";
import { IFormResponse } from "../../../../contracts/response/formResponse";
import { ResultWithValue } from "../../../../contracts/resultWithValue";
import { anyObject } from "../../../../helper/typescriptHacks";
import { getLog } from "../../../internal/logService";
import { Community, CommunityRecord, XataClient } from "../xata";

export const readCommunity = async (xata: XataClient, id: string): Promise<ResultWithValue<CommunityRecord>> => {
    try {
        const record = await xata.db.community.read(id);

        if (record == null) {
            throw `getCommunitySubmission - Record not found for (${id})`;
        }

        return {
            isSuccess: true,
            value: record,
            errorMessage: '',
        }
    } catch (ex) {
        return {
            isSuccess: false,
            value: anyObject,
            errorMessage: ex?.toString?.() ?? 'error occurred while creating record in database',
        };
    }
}

export const createCommunity = async (xata: XataClient, persistence: Omit<Community, 'id'>): Promise<ResultWithValue<IFormResponse>> => {
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
        }
    } catch (ex) {
        return {
            isSuccess: false,
            value: anyObject,
            errorMessage: ex?.toString?.() ?? 'error occurred while creating record in database',
        };
    }
};

export const updateWebhookIdCommunity = async (xata: XataClient, recordId: string, webhookMessageId: string): Promise<void> => {
    try {
        await xata.db.community.update(recordId, { discordWebhookId: webhookMessageId });
    } catch (ex) {
        getLog().e('addWebhookIdToCommunitySubmission', ex);
    }
};

