import { ApprovalStatus } from "../constants/enum/approvalStatus";
import { ResultWithValue } from "./resultWithValue";

export interface IVerifyStatusParams {
    id: string;
    segment: string;
}

export interface WithApprovalStatus {
    approvalStatus: ApprovalStatus;
};

export type VerifyStatusFunc = (params: IVerifyStatusParams) => Promise<ResultWithValue<WithApprovalStatus>>;