import { BuilderDto, BuilderDtoValidation } from '../../contracts/dto/forms/builderDto';
import { baseHandleFormSubmission } from './baseForm';

const handleSubmission = (body: BuilderDto) => {
    return {
        isSuccess: true,
        errorMessage: ''
    };
}

export const handleBuilderFormSubmission = baseHandleFormSubmission<BuilderDto>({
    name: 'BuilderDto',
    validationObj: BuilderDtoValidation,
    handleBody: handleSubmission,
});
