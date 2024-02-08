import { addSpacesForEnum, capitalizeFirstLetter } from '@helpers/stringHelper';

export enum ApprovalStatus {
  pending,
  changesNeeded,
  approved,
  approvedAndProcessed,
  denied,
}

export const approvalStatusToString = (approvalStatus: ApprovalStatus) =>
  ApprovalStatus[approvalStatus];
export const approvalStatusFromString = (approvalStatus: string): ApprovalStatus | undefined => {
  const approvalLookup = {
    [ApprovalStatus[ApprovalStatus.pending]]: ApprovalStatus.pending,
    [ApprovalStatus[ApprovalStatus.changesNeeded]]: ApprovalStatus.changesNeeded,
    [ApprovalStatus[ApprovalStatus.approved]]: ApprovalStatus.approved,
    [ApprovalStatus[ApprovalStatus.approvedAndProcessed]]: ApprovalStatus.approvedAndProcessed,
    [ApprovalStatus[ApprovalStatus.denied]]: ApprovalStatus.denied,
  };
  const lookupValue = approvalLookup[approvalStatus];
  if (lookupValue != null) return lookupValue;
};

export const colourFromApprovalStatus = (approvalStatus: ApprovalStatus): number => {
  const approvalLookup = {
    [ApprovalStatus.pending]: 5814783,
    [ApprovalStatus.changesNeeded]: 5814783,
    [ApprovalStatus.approved]: 32768,
    [ApprovalStatus.approvedAndProcessed]: 7231183,
    [ApprovalStatus.denied]: 13369858,
  };
  return approvalLookup[approvalStatus];
};

export const getFriendlyApprovalStatus = (approvalStatus?: ApprovalStatus): string => {
  const approvalString = ApprovalStatus[approvalStatus ?? ApprovalStatus.pending];
  return capitalizeFirstLetter(addSpacesForEnum(approvalString));
};
