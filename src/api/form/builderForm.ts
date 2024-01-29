import { IDatabaseFile } from '../../contracts/databaseFile';
import { BuilderDto, BuilderDtoMeta } from '../../contracts/dto/forms/builderDto';
import { IFormResponse } from '../../contracts/response/formResponse';
import { ResultWithValue } from '../../contracts/resultWithValue';
import { anyObject } from '../../helper/typescriptHacks';
import { getDatabaseService } from '../../services/external/database/databaseService';
import { baseHandleFormSubmission } from './baseForm';
import { builderFileHandler } from './builder/builderFileHandler';
import { builderMessageBuilder } from './builder/builderMessageBuilder';

interface IBuilderImages {
    profilePicFile?: IDatabaseFile;
    bioMediaFiles?: Array<IDatabaseFile>;
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
    validationObj: BuilderDtoMeta,
    handleRequest: handleSubmission,
    handleFilesInFormData: builderFileHandler,
    discordMessageBuilder: builderMessageBuilder,
    afterDiscordMessage: getDatabaseService().addWebhookIdToBuilder,
});
