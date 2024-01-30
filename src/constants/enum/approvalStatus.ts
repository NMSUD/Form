import { addSpacesForEnum, capitalizeFirstLetter } from "../../helper/stringHelper";

export enum ApprovalStatus {
    pending,
    changesNeeded,
    approvedAndProcessing,
    approved,
    denied,
}

export const approvalStatusToString = (approvalStatus: ApprovalStatus) => ApprovalStatus[approvalStatus];
export const approvalStatusFromString = (approvalStatus: string): ApprovalStatus | undefined => {
    const approvalLookup = {
        [ApprovalStatus[ApprovalStatus.pending]]: ApprovalStatus.pending,
        [ApprovalStatus[ApprovalStatus.changesNeeded]]: ApprovalStatus.changesNeeded,
        [ApprovalStatus[ApprovalStatus.approvedAndProcessing]]: ApprovalStatus.approvedAndProcessing,
        [ApprovalStatus[ApprovalStatus.approved]]: ApprovalStatus.approved,
        [ApprovalStatus[ApprovalStatus.denied]]: ApprovalStatus.denied,
    }
    const lookupValue = approvalLookup[approvalStatus];
    if (lookupValue != null) return lookupValue;
}

export const colourFromApprovalStatus = (approvalStatus: ApprovalStatus): number => {
    const approvalLookup = {
        [ApprovalStatus.pending]: 5814783,
        [ApprovalStatus.changesNeeded]: 5814783,
        [ApprovalStatus.approvedAndProcessing]: 32768,
        [ApprovalStatus.approved]: 32768,
        [ApprovalStatus.denied]: 13369858,
    }
    return approvalLookup[approvalStatus];
}

export const getFriendlyApprovalStatus = (approvalStatus?: ApprovalStatus): string => {
    const approvalString = ApprovalStatus[approvalStatus ?? ApprovalStatus.pending];
    return capitalizeFirstLetter(addSpacesForEnum(approvalString));
}