import { ApprovalStatus } from '../../constants/enum/approvalStatus';
import { CommunityDto, CommunityDtoMeta } from '../../contracts/dto/forms/communityDto';
import { IFormResponse } from '../../contracts/response/formResponse';
import { ResultWithValue } from '../../contracts/resultWithValue';
import { makeArrayOrDefault } from '../../helper/arrayHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { getDatabaseService } from '../../services/external/database/databaseService';
import { Community } from '../../services/external/database/xata';
import { baseHandleFormSubmission } from './baseForm';
import { communityMessageBuilder } from './community/communityMessageBuilder';
import { ICommunityImages, communityFileHandler } from './community/communityFileHandler';

const handleSubmission = async (body: CommunityDto, images: ICommunityImages): Promise<ResultWithValue<IFormResponse>> => {
    const persistence: Omit<Community, 'id'> = {
        name: body.name,
        profilePicFile: images.profilePicFile as any,
        bio: body.bio,
        bioMediaFiles: makeArrayOrDefault(images.bioMediaFiles) as any,
        bioMediaUrls: '',
        tags: body.tags.join(','),
        socials: body.socials.join(','),
        contactDetails: body.contactDetails,
        approvalStatus: ApprovalStatus.pending,
    }
    const formResponse = await getDatabaseService().addCommunity(persistence);
    if (formResponse.isSuccess == false) return ({
        isSuccess: false,
        value: anyObject,
        errorMessage: `handleCommunityFormSubmission - ${formResponse.errorMessage}`,
    });

    return {
        isSuccess: true,
        value: formResponse.value,
        errorMessage: ''
    };
}

export const handleCommunityFormSubmission = baseHandleFormSubmission<CommunityDto, ICommunityImages>({
    name: 'CommunityDto',
    validationObj: CommunityDtoMeta,
    handleRequest: handleSubmission,
    handleFilesInFormData: communityFileHandler,
    discordMessageBuilder: communityMessageBuilder,
    afterDiscordMessage: getDatabaseService().addWebhookIdToCommunity,
});
