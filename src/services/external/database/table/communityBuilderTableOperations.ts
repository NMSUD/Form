import { getLog } from '../../../internal/logService';
import { ResultWithValue } from '@contracts/resultWithValue';
import { XataClient, CommunityBuilderRecord } from '../xata';

export const getByBuilderId =
  (xata: XataClient) =>
  async (builderId: string): Promise<ResultWithValue<Array<CommunityBuilderRecord>>> => {
    try {
      const records = await xata.db.communityBuilder
        .filter({
          'builder.id': builderId,
        })
        .getAll();
      return {
        isSuccess: true,
        value: records.map((r) => r as unknown as CommunityBuilderRecord),
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `getByBuilderId: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: [],
        errorMessage: errMsg,
      };
    }
  };

export const getByCommunityId =
  (xata: XataClient) =>
  async (communityId: string): Promise<ResultWithValue<Array<CommunityBuilderRecord>>> => {
    try {
      const records = await xata.db.communityBuilder
        .filter({
          'community.id': communityId,
        })
        .getAll();
      return {
        isSuccess: true,
        value: records.map((r) => r as unknown as CommunityBuilderRecord),
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `getByCommunityId: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: [],
        errorMessage: errMsg,
      };
    }
  };
