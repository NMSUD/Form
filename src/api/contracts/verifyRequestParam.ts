import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { DiscordWebhook } from '@contracts/generated/discordWebhook';
import { ResultWithValue } from '@contracts/resultWithValue';

export interface IVerifyRequestParams {
    id: string;
    decision: string;
    segment: string;
    check: string;
}

export interface IVerifyRequestDiscordParams {
    id: string;
    message: DiscordWebhook;
}

export type VerifyRequestFunc = (
    params: IVerifyRequestParams,
    approvalStatus: ApprovalStatus,
) => Promise<ResultWithValue<IVerifyRequestDiscordParams>>;
