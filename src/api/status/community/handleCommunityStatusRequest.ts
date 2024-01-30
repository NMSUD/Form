import { CommunityDto } from '../../../contracts/dto/forms/communityDto';
import { ResultWithValue } from '../../../contracts/resultWithValue';
import { IVerifyStatusParams, VerifyStatusFunc, WithApprovalStatus } from '../../../contracts/verifyStatusParam';
import { anyObject } from '../../../helper/typescriptHacks';
import { getDatabaseService } from '../../../services/external/database/databaseService';
import { getLog } from '../../../services/internal/logService';

export const handleCommunityStatusRequest: VerifyStatusFunc = async (
    params: IVerifyStatusParams
): Promise<ResultWithValue<CommunityDto & WithApprovalStatus>> => {
    getLog().i('status-community-submission');

    const recordResult = await getDatabaseService().community.read(params.id);
    if (recordResult.isSuccess == false) return {
        isSuccess: recordResult.isSuccess,
        errorMessage: recordResult.errorMessage,
        value: anyObject,
    }

    const dto: CommunityDto = {
        name: recordResult.value.name,
        profilePicFile: anyObject,
        profilePicUrl: recordResult.value.profilePicUrl ?? '',
        bio: recordResult.value.bio,
        bioMediaUrls: recordResult.value.bioMediaUrls.split(','),
        bioMediaFiles: anyObject,
        homeGalaxies: [],//recordResult.value.homeGalaxies,
        tags: recordResult.value.tags.split(','),
        socials: recordResult.value.socials.split(','),
        contactDetails: recordResult.value.contactDetails,
    };

    return {
        isSuccess: true,
        errorMessage: '',
        value: {
            ...dto,
            approvalStatus: recordResult.value.approvalStatus
        },
    };
}