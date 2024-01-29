
import { ApprovalStatus } from "../../../../constants/enum/approvalStatus";
import { IFormResponse } from "../../../../contracts/response/formResponse";
import { ResultWithValue } from "../../../../contracts/resultWithValue";
import { anyObject } from "../../../../helper/typescriptHacks";
import { getLog } from "../../../internal/logService";
import { Builder, BuilderRecord, XataClient } from "../xata";

export const readBuilder = async (xata: XataClient, id: string): Promise<ResultWithValue<BuilderRecord>> => {
    try {
        const record = await xata.db.builder.read(id);

        if (record == null) {
            throw `getBuilderSubmission - Record not found for (${id})`;
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

export const createBuilder = async (xata: XataClient, persistence: Omit<Builder, 'id'>): Promise<ResultWithValue<IFormResponse>> => {
    try {
        const newRecordCreated = await xata.db.builder.create({
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

export const updateWebhookIdBuilder = async (xata: XataClient, recordId: string, webhookMessageId: string): Promise<void> => {
    try {
        await xata.db.builder.update(recordId, { discordWebhookId: webhookMessageId });
    } catch (ex) {
        getLog().e('addWebhookIdToBuilderSubmission', ex);
    }
};

