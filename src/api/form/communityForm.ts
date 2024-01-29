import { XataFile } from '@xata.io/client';
import { ApprovalStatus } from '../../constants/enum/approvalStatus';
import { FormDataKey } from '../../constants/form';
import { CommunityDto, CommunityDtoMeta, ICommunityImages } from '../../contracts/dto/forms/communityDto';
import { IFormResponse } from '../../contracts/response/formResponse';
import { ResultWithValue } from '../../contracts/resultWithValue';
import { makeArrayOrDefault } from '../../helper/arrayHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { getDatabaseService } from '../../services/external/database/databaseService';
import { Community } from '../../services/external/database/xata';
import { getApiFileService } from '../../services/internal/apiFileService';
import { getLog } from '../../services/internal/logService';
import { baseHandleFormSubmission } from './baseForm';
import { getDiscordService } from '../../services/external/discord/discordService';
import { communitySubmissionMessageBuilder } from '../../services/external/discord/discordMessageBuilder';
import { getConfig } from '../../services/internal/configService';

const handleFiles = async (formData: any): Promise<ResultWithValue<ICommunityImages>> => {
    const result: ICommunityImages = {
        bioMediaFiles: [],
    }

    const profilePicFileFromForm = formData[FormDataKey.profilePicFile];
    const profilePicFileResult = await getApiFileService().formDataToDatabaseFile(profilePicFileFromForm);
    if (profilePicFileResult.isSuccess == false) {
        getLog().e('handleCommunityFormSubmission profilePicFileFromForm', profilePicFileResult.value);
        return {
            isSuccess: false,
            value: result,
            errorMessage: profilePicFileResult.errorMessage,
        };
    }
    result.profilePicFile = profilePicFileResult.value;

    const bioMediaFilesFromForm = formData[FormDataKey.bioMediaFiles];
    for (const bioMediaFileFromForm of makeArrayOrDefault(bioMediaFilesFromForm)) {
        const bioMediaDbFileResult = await getApiFileService().formDataToDatabaseFile(bioMediaFileFromForm);
        if (bioMediaDbFileResult.isSuccess == false) {
            getLog().e('handleCommunityFormSubmission bioMediaFileFromForm', bioMediaFileFromForm.value);
            return {
                isSuccess: false,
                value: result,
                errorMessage: profilePicFileResult.errorMessage,
            };
        }
        result.bioMediaFiles?.push(bioMediaDbFileResult.value);
    }

    return {
        isSuccess: true,
        value: result,
        errorMessage: '',
    };
}

const handleSubmission = async (body: CommunityDto, images: ICommunityImages): Promise<ResultWithValue<IFormResponse>> => {
    const persistence: Omit<Community, 'id'> = {
        name: body.name,
        profilePicFile: images.profilePicFile as any,
        bio: body.bio,
        bioMediaFiles: makeArrayOrDefault(images.bioMediaFiles) as any,
        tags: body.tags.join(','),
        socials: body.socials.join(','),
        contactDetails: body.contactDetails,
        approvalStatus: ApprovalStatus.pending,
    }
    const formResponse = await getDatabaseService().addCommunitySubmission(persistence);
    if (formResponse.isSuccess == false) return ({
        isSuccess: false,
        value: anyObject,
        errorMessage: `handleCommunityFormSubmission - ${formResponse.errorMessage}`,
    });

    const discordUrl = getConfig().getDiscordWebhookUrl();
    const webhookPayload = communitySubmissionMessageBuilder({
        id: formResponse.value.id,
        dto: body,
        dtoMeta: CommunityDtoMeta,
    });
    const discordResponse = await getDiscordService().sendDiscordMessage(discordUrl, webhookPayload);
    if (discordResponse.isSuccess) {
        await getDatabaseService().addWebhookIdToCommunitySubmission(
            formResponse.value.id,
            discordResponse.value.id
        );
    }

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
    fileMapper: handleFiles,
});
