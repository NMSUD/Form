import { nameof } from "../../../helper/propHelper";
import { minItems } from "../../validation/arrayValidation";
import { IValidationObject, multiValidation, notNull, validateForEach } from "../../validation/baseValidation";
import { maxLength, minLength, shouldBeUrl } from "../../validation/textValidation";

export const communityBioMaxLength = 500;
export const communityContactDetailsMaxLength = 500;

export interface CommunityDto {
    name: string;
    profilePic: string;
    profilePicFileUpload: File;
    bio: string;
    bioMediaUrls: Array<string>;
    tags: Array<string>;
    socials: Array<string>;
    contactDetails: string;
}

export const CommunityDtoValidation: IValidationObject<CommunityDto> = {
    name: {
        label: 'Name',
        validator: multiValidation([
            minLength(2),
            maxLength(100),
        ]),
    },
    profilePic: {
        label: 'Profile picture',
        validator: maxLength(500),
    },
    profilePicFileUpload: {
        label: 'Profile picture',
        validator: notNull('You need to upload an image'),
    },
    bio: {
        label: 'Bio',
        validator: multiValidation([
            minLength(2),
            maxLength(communityBioMaxLength),
        ]),
    },
    bioMediaUrls: {
        label: 'Media upload',
        validator: validateForEach(
            multiValidation([
                minLength(2),
                shouldBeUrl,
            ]),
        ),
    },
    tags: {
        label: 'Tags',
        validator: minItems(1),
    },
    socials: {
        label: 'Socials',
        validator: multiValidation([
            minItems(1),
            validateForEach(
                multiValidation([
                    minLength(2),
                    shouldBeUrl,
                ]),
            ),
        ]),
    },
    contactDetails: {
        label: 'Contact Details',
        validator: maxLength(communityBioMaxLength),
    },
}
