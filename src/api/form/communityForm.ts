import { XataFile } from '@xata.io/client';
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
import { getLog } from '../../services/internal/logService';
import { baseHandleFormSubmission } from './baseForm';
import { makeArrayOrDefault } from '../../helper/arrayHelper';

interface ICommunityImages {
    profilePicFile?: IDatabaseFile;
    bioMediaFiles?: Array<IDatabaseFile>;
}

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
    for (const bioMediaFileFromForm of bioMediaFilesFromForm) {
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
        profilePicFile: XataFile.fromBase64(images.profilePicFile!.base64Content),
        bio: body.bio,
        bioMediaFiles: makeArrayOrDefault(images.bioMediaFiles)
            .map(bfile => XataFile.fromBase64(bfile!.base64Content) as any),
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
