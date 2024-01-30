import { communityMessageBuilder } from '../../../api/form/community/communityMessageBuilder';
import { ApprovalStatus } from '../../../constants/enum/approvalStatus';
import { CommunityDto, CommunityDtoMeta } from '../../../contracts/dto/forms/communityDto';
import { ResultWithValue } from '../../../contracts/resultWithValue';
import { IVerifyRequestDiscordParams, IVerifyRequestParams, VerifyRequestFunc } from '../../../contracts/verifyRequestParam';
import { getCommunityCheck } from '../../../helper/checkHelper';
import { anyObject } from '../../../helper/typescriptHacks';
import { getDatabaseService } from '../../../services/external/database/databaseService';
import { getLog } from '../../../services/internal/logService';

export const handleCommunityVerifyRequest: VerifyRequestFunc = async (
    params: IVerifyRequestParams,
    approvalStatus: ApprovalStatus
): Promise<ResultWithValue<IVerifyRequestDiscordParams>> => {
    getLog().i('verify-community-submission');

    const recordResult = await getDatabaseService().community.read(params.id);
    if (recordResult.isSuccess == false) return {
        isSuccess: recordResult.isSuccess,
        errorMessage: recordResult.errorMessage,
        value: anyObject,
    }

    try {
        const calculatedCheck = getCommunityCheck(recordResult.value.id, recordResult.value.name, recordResult.value.contactDetails);
        if (calculatedCheck != parseInt(params.check)) {
            return {
                isSuccess: false,
                errorMessage: 'The calculated check value does not match the supplied check value. Maybe the data has been changed?',
                value: anyObject,
            };
        }
    } catch (ex) {
        return {
            isSuccess: false,
            errorMessage: `Unable to compare the provided check with the calculated check: ${ex?.toString?.()}`,
            value: anyObject,
        };
    }

    const updateResult = await getDatabaseService().community.updateApprovalStatus(params.id, approvalStatus);
    if (updateResult.isSuccess == false) return {
        isSuccess: updateResult.isSuccess,
        errorMessage: updateResult.errorMessage,
        value: anyObject,
    }

    const webhookPayload = communityMessageBuilder({
        id: recordResult.value.id,
        dto: (recordResult.value as unknown as CommunityDto), // for reuse
        dtoMeta: CommunityDtoMeta,
        approvalStatus: approvalStatus,
        includeActionsEmbed: false,
    });

    return {
        isSuccess: true,
        errorMessage: '',
        value: {
            id: recordResult.value.discordWebhookId ?? '',
            message: webhookPayload,
        },
    };
}