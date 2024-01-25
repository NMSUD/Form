import { minItems } from "../../validation/arrayValidation";
import { multiValidation, noValidation, notNull, seperateValidation, validateForEach } from "../../validation/baseValidation";
import { maxLength, minLength, shouldBeUrl } from "../../validation/textValidation";
import { IFormDtoMeta } from "./baseFormDto";

export const communityBioMaxLength = 500;
export const communityContactDetailsMaxLength = 500;

export interface CommunityDto {
    name: string;
    profilePicFile: File;
    bio: string;
    bioMediaFiles: Array<File>;
    tags: Array<string>;
    socials: Array<string>;
    contactDetails: string;
}

export const CommunityDtoValidation: IFormDtoMeta<CommunityDto> = {
    profilePicFile: {
        label: 'Profile picture',
        validator: seperateValidation({
            api: noValidation,
            ui: notNull('You need to upload an image')
        }),
    },
    name: {
        label: 'Name',
        validator: multiValidation(
            minLength(2),
            maxLength(100),
        ),
    },
    bio: {
        label: 'Bio',
        validator: multiValidation(
            minLength(2),
            maxLength(communityBioMaxLength),
        ),
    },
    bioMediaFiles: {
        label: 'Media upload',
        validator: seperateValidation({
            api: noValidation,
            ui: validateForEach(
                notNull('You need to upload an image'),
            )
        }),
    },
    tags: {
        label: 'Tags',
        validator: minItems(1),
    },
    socials: {
        label: 'Socials',
        validator: multiValidation(
            minItems(1),
            validateForEach(
                multiValidation(
                    minLength(2),
                    shouldBeUrl,
                ),
            ),
        ),
    },
    contactDetails: {
        label: 'Contact Details',
        validator: maxLength(communityBioMaxLength),
    },
}

