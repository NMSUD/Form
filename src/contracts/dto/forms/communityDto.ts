import { DefaultImageRestrictions } from "../../../constants/image";
import { maxItems, minItems } from "../../validation/arrayValidation";
import { multiValidation, noValidation, notNull, seperateValidation, validateForEach } from "../../validation/baseValidation";
import { webImageRestrictions } from "../../validation/imageValidation";
import { maxLength, minLength, shouldBeUrl } from "../../validation/textValidation";
import { IFormDtoMeta } from "./baseFormDto";

export const communityBioMaxLength = 500;
export const communityContactDetailsMaxLength = 500;

export interface CommunityDto {
    name: string;
    profilePicFile: File;
    bio: string;
    bioMediaFiles: Array<File>;
    homeGalaxies: Array<string>;
    tags: Array<string>;
    socials: Array<string>;
    contactDetails: string;
}

export const CommunityDtoValidation: IFormDtoMeta<CommunityDto> = {
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
    homeGalaxies: {
        label: 'Home Galaxies',
        validator: noValidation,
    },
    tags: {
        label: 'Tags',
        validator: minItems(1),
    },
    socials: {
        label: 'Socials',
        helpText: 'Add links by pressing the "ENTER" key or clicking the arrow on the right hand side. These links will be displayed as icons, if we are missing a customised icon for a link, please feel free to let us know if the feedback page!',
        validator: multiValidation(
            minItems(1),
            maxItems(10),
            validateForEach(
                multiValidation(
                    minLength(2),
                    shouldBeUrl,
                ),
            ),
        ),
    },
    contactDetails: {
        label: 'Contact Details (This will not be shared)',
        helpText: 'This is so that we can get in contact with you if there are any issue with your submissions, etc.',
        validator: maxLength(communityBioMaxLength),
    },
}

