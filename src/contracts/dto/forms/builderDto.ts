import { minItems } from "../../validation/arrayValidation";
import { IValidationObject, multiValidation, noValidation, notNull, validateForEach } from "../../validation/baseValidation";
import { maxLength, minLength, shouldBeUrl } from "../../validation/textValidation";
import { PlatformType } from "../enum/platformType";

export const builderBioMaxLength = 500;
export const builderContactDetailsMaxLength = 500;

export interface BuilderDto {
    name: string;
    profilePic: string;
    profilePicFileUpload: File;
    bio: string;
    platforms: Array<PlatformType>;
    labels: Array<string>;
    socials: Array<string>;
    contactDetails: string;
}

export const BuilderDtoValidation: IValidationObject<BuilderDto> = {
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
            maxLength(builderBioMaxLength),
        ]),
    },
    platforms: {
        label: 'Platforms',
        validator: minItems(1),
    },
    labels: {
        label: 'Labels',
        validator: noValidation,
    },
    socials: {
        label: 'Socials',
        validator: validateForEach(
            multiValidation([
                minLength(2),
                shouldBeUrl,
            ]),
        ),
    },
    contactDetails: {
        label: 'Contact Details',
        validator: maxLength(builderContactDetailsMaxLength),
    },
}