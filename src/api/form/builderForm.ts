import { IDatabaseFile } from '../../contracts/databaseFile';
import { BuilderDto, BuilderDtoValidation } from '../../contracts/dto/forms/builderDto';
import { IFormResponse } from '../../contracts/response/formResponse';
import { ResultWithValue } from '../../contracts/resultWithValue';
import { anyObject } from '../../helper/typescriptHacks';
import { baseHandleFormSubmission } from './baseForm';

interface IBuilderImages {
    profilePicFile?: IDatabaseFile;
    bioMediaFiles?: Array<IDatabaseFile>;
}

const handleFiles = async (formData: any): Promise<ResultWithValue<IBuilderImages>> => {
    // const result: ICommunityImages = {
    //     bioMediaFiles: [],
    // }

    // const profilePicFileFromForm = formData[FormDataKey.profilePicFile];
    // result.profilePicFile = getApiFileService().formDataToDatabaseFile(profilePicFileFromForm);

    // // const bioMediaFilesFromForm = formData[FormDataKey.bioMediaFiles];
    // // for (const bioMediaFileFromForm of bioMediaFilesFromForm) {
    // //     const bioMediaDbFile = getApiFileService().formDataToDatabaseFile(bioMediaFileFromForm);
    // //     result.bioMediaFiles?.push(bioMediaDbFile);
    // // }

    return {
        isSuccess: true,
        // value: result,
        value: anyObject,
        errorMessage: '',
    };
}

const handleSubmission = async (body: BuilderDto, images: IBuilderImages): Promise<ResultWithValue<IFormResponse>> => {
    return {
        isSuccess: true,
        value: anyObject,
        errorMessage: ''
    };
}

export const handleBuilderFormSubmission = baseHandleFormSubmission<BuilderDto, IBuilderImages>({
    name: 'BuilderDto',
    validationObj: BuilderDtoValidation,
    handleRequest: handleSubmission,
    fileMapper: handleFiles,
});
