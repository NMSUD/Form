import { VerifyRequestFunc } from '@api/contracts/verifyRequestParam';
import { VerifyStatusFunc } from '@api/contracts/verifyStatusParam';
import { segments } from '@constants/api';
import { communityStatusHandler } from './status/community/communityStatusHandler';
import { communityVerifyHandler } from './verify/community/communityVerifyHandler';

// TODO make ts force us to implement these functions
// [prop in keyof segments]:
export const statusHandlerLookup: { [x: string]: VerifyStatusFunc } = {
  [segments.community]: communityStatusHandler,
};

export const verifyHandlerLookup: { [x: string]: VerifyRequestFunc } = {
  [segments.community]: communityVerifyHandler,
};
