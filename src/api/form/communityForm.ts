import { ApprovalStatus } from '../../constants/enum/approvalStatus';
import { FormDataKey } from '../../constants/form';
import { IDatabaseFile } from '../../contracts/databaseFile';
import { CommunityDto, CommunityDtoValidation } from '../../contracts/dto/forms/communityDto';
import { IFormResponse } from '../../contracts/response/formResponse';
import { ResultWithValue } from '../../contracts/resultWithValue';
import { anyObject } from '../../helper/typescriptHacks';
import { Community } from '../../integration/xata';
import { getDatabaseService } from '../../services/external/database/databaseService';
import { getApiFileService } from '../../services/internal/apiFileService';
import { baseHandleFormSubmission } from './baseForm';

interface ICommunityImages {
    profilePicFile?: IDatabaseFile;
    bioMediaFiles?: Array<IDatabaseFile>;
}

const handleFiles = async (formData: any): Promise<ResultWithValue<ICommunityImages>> => {
    const result: ICommunityImages = {
        bioMediaFiles: [],
    }

    const profilePicFileFromForm = formData[FormDataKey.profilePicFile];
    result.profilePicFile = getApiFileService().formDataToDatabaseFile(profilePicFileFromForm);

    // const bioMediaFilesFromForm = formData[FormDataKey.bioMediaFiles];
    // for (const bioMediaFileFromForm of bioMediaFilesFromForm) {
    //     const bioMediaDbFile = getApiFileService().formDataToDatabaseFile(bioMediaFileFromForm);
    //     result.bioMediaFiles?.push(bioMediaDbFile);
    // }

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
        // bioMediaFiles: dto.bioMediaFiles,
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

    return {
        isSuccess: true,
        value: formResponse.value,
        errorMessage: ''
    };
}

export const handleCommunityFormSubmission = baseHandleFormSubmission<CommunityDto, ICommunityImages>({
    name: 'CommunityDto',
    validationObj: CommunityDtoValidation,
    handleRequest: handleSubmission,
    fileMapper: handleFiles,
});
