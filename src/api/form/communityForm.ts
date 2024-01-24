import { CommunityDto, CommunityDtoValidation } from '../../contracts/dto/forms/communityDto';
import { baseHandleFormSubmission } from './baseForm';

const handleSubmission = (body: CommunityDto) => {
    return {
        isSuccess: true,
        errorMessage: ''
    };
}

export const handleCommunityFormSubmission = baseHandleFormSubmission<CommunityDto>({
    name: 'CommunityDto',
    validationObj: CommunityDtoValidation,
    handleBody: handleSubmission,
});
