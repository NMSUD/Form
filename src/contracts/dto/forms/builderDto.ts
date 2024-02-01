import { DefaultImageRestrictions } from '@constants/image';
import { PlatformType } from '@contracts/dto/enum/platformType';
import { IFormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import { minItems } from '@validation/arrayValidation';
import {
  multiValidation,
  noValidation,
  notNull,
  seperateValidation,
  validateForEach,
} from '@validation/baseValidation';
import { webImageRestrictions } from '@validation/imageValidation';
import { maxLength, minLength, shouldBeUrl } from '@validation/textValidation';

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

export const BuilderDtoMeta: IFormDtoMeta<BuilderDto> = {
  profilePicFile: {
    label: 'Profile picture',
    defaultValue: null,
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
    defaultValue: '',
    displayInDiscordMessage: true,
    helpText: 'Your IN-GAME character name',
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  bio: {
    label: 'Bio',
    defaultValue: '',
    displayInDiscordMessage: true,
    validator: multiValidation(minLength(2), maxLength(builderBioMaxLength)),
  },
  platforms: {
    label: 'Platforms',
    defaultValue: [],
    displayInDiscordMessage: true,
    validator: minItems(1),
  },
  startedPlaying: {
    label: 'Date that you started playing',
    displayInDiscordMessage: true,
    validator: noValidation,
  },
  buildTechniquesUsed: {
    label: 'Build techniques used',
    defaultValue: [],
    displayInDiscordMessage: true,
    validator: noValidation,
  },
  communityAffiliations: {
    label: 'Community affiliations',
    defaultValue: [],
    displayInDiscordMessage: true,
    validator: noValidation,
  },
  labels: {
    label: 'Labels',
    defaultValue: [],
    displayInDiscordMessage: true,
    validator: noValidation,
  },
  socials: {
    label: 'Socials',
    defaultValue: [],
    displayInDiscordMessage: true,
    validator: validateForEach(multiValidation(minLength(2), shouldBeUrl)),
  },
  contactDetails: {
    label: 'Contact Details (only visible to NMSUD organisers)',
    helpText: `This is so that we can get in contact with you if there are any issue with your submissions, etc.`,
    displayInDiscordMessage: true,
    validator: maxLength(builderContactDetailsMaxLength),
  },
};
