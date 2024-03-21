import { getLog } from '../../../internal/logService';
import { ResultWithValue } from '@contracts/resultWithValue';
import { XataClient, CommunityBuilderRecord } from '../xata';

export const getCommunityBuilderRecordByBuilderId =
  (xata: XataClient) =>
  async (builderId: string): Promise<ResultWithValue<Array<CommunityBuilderRecord>>> => {
    try {
      const records = await xata.db.communityBuilder
        .filter({
          'builder.id': builderId,
        })
        .select(['id', 'builder.id', 'builder.name', 'community.id', 'community.name'])
        .getAll();
      return {
        isSuccess: true,
        value: records.map((r) => r as unknown as CommunityBuilderRecord),
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `getCommunityBuilderRecordByBuilderId: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: [],
        errorMessage: errMsg,
      };
    }
  };

export const getCommunityBuilderRecordByCommunityId =
  (xata: XataClient) =>
  async (communityId: string): Promise<ResultWithValue<Array<CommunityBuilderRecord>>> => {
    try {
      const records = await xata.db.communityBuilder
        .filter({
          'community.id': communityId,
        })
        .select(['id', 'builder.id', 'builder.name', 'community.id', 'community.name'])
        .getAll();
      return {
        isSuccess: true,
        value: records.map((r) => r as unknown as CommunityBuilderRecord),
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `getCommunityBuilderRecordByCommunityId: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: [],
        errorMessage: errMsg,
      };
    }
  };
