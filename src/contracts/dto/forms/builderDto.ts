import { DefaultImageRestrictions } from "../../../constants/image";
import { minItems } from "../../../validation/arrayValidation";
import { webImageRestrictions } from "../../../validation/imageValidation";
import { maxLength, minLength, shouldBeUrl } from "../../../validation/textValidation";
import { multiValidation, noValidation, notNull, seperateValidation, validateForEach } from "../../../validation/baseValidation";
import { PlatformType } from "../enum/platformType";
import { IFormDtoMeta } from "./baseFormDto";

export const builderBioMaxLength = 500;
export const builderContactDetailsMaxLength = 500;

export interface BuilderDto {
    name: string;
    profilePicFile: File;
    bio: string;
    platforms: Array<PlatformType>;
    startedPlaying: Date;
    buildTechniquesUsed: Array<string>;
    communityAffiliations: Array<string>;
    labels: Array<string>;
    socials: Array<string>;
    contactDetails: string;
}

export const BuilderDtoValidation: IFormDtoMeta<BuilderDto> = {
    profilePicFile: {
        label: 'Profile picture',
        validator: seperateValidation({
            api: noValidation,
            ui: multiValidation(
                notNull('You need to upload an image'),
                webImageRestrictions(DefaultImageRestrictions.profilePic),
            ),
        }),
    },
    name: {
        label: 'Name',
        helpText: 'Your IN-GAME character name',
        validator: multiValidation(
            minLength(2),
            maxLength(100),
        ),
    },
    bio: {
        label: 'Bio',
        validator: multiValidation(
            minLength(2),
            maxLength(builderBioMaxLength),
        ),
    },
    platforms: {
        label: 'Platforms',
        validator: minItems(1),
    },
    startedPlaying: {
        label: 'Date that you started playing',
        validator: noValidation,
    },
    buildTechniquesUsed: {
        label: 'Build techniques used',
        validator: noValidation,
    },
    communityAffiliations: {
        label: 'Community affiliations',
        validator: noValidation,
    },
    labels: {
        label: 'Labels',
        validator: noValidation,
    },
    socials: {
        label: 'Socials',
        validator: validateForEach(
            multiValidation(
                minLength(2),
                shouldBeUrl,
            ),
        ),
    },
    contactDetails: {
        label: 'Contact Details',
        validator: maxLength(builderContactDetailsMaxLength),
    },
}