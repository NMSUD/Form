import { ApprovalStatus } from "../../constants/enum/approvalStatus";

export interface IFormResponse {
    id: string;
    name: string;
    iconUrl?: string;
}

export interface IFormWithApprovalResponse extends IFormResponse {
    approvalStatus: ApprovalStatus;
}