import { DefaultImageRestrictions } from '@constants/image';
import { PlatformType } from '@contracts/dto/enum/platformType';
import { IFormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import {
  arrayDiscordLine,
  basicDiscordLine,
  shortLinkDiscordLine,
} from '@helpers/discordMessageHelper';
import { minItems } from '@validation/arrayValidation';
import {
  multiValidation,
  noValidation,
  notNull,
  seperateValidation,
  validateForEach,
} from '@validation/baseValidation';
import { maxDate, minDate } from '@validation/dateValidation';
import { webImageRestrictions } from '@validation/imageValidation';
import { maxLength, minLength, shouldBeUrl } from '@validation/textValidation';

export const builderBioMaxLength = 500;
export const builderContactDetailsMaxLength = 500;
export const builderStartedPlayingMinDate = new Date('2016-08-09');
export const builderStartedPlayingMaxDate = new Date();

export interface BuilderDto {
  name: string;
  profilePicUrl: string;
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
  profilePicUrl: {
    label: 'Profile Pic Url',
    dontSaveToLocalStorage: true,
    displayInDiscordMessage: shortLinkDiscordLine('click to open'),
    validator: noValidation,
  },
  profilePicFile: {
    label: 'Profile picture',
    defaultValue: null,
    dontSaveToLocalStorage: true,
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
    helpText: 'Your IN-GAME character name',
    displayInDiscordMessage: basicDiscordLine,
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  bio: {
    label: 'Bio',
    defaultValue: '',
    displayInDiscordMessage: basicDiscordLine,
    validator: multiValidation(minLength(2), maxLength(builderBioMaxLength)),
  },
  platforms: {
    label: 'Platforms',
    defaultValue: [],
    displayInDiscordMessage: arrayDiscordLine,
    validator: minItems(1),
  },
  startedPlaying: {
    label: 'Date that you started playing',
    displayInDiscordMessage: basicDiscordLine,
    validator: multiValidation(
      minDate(builderStartedPlayingMinDate),
      maxDate(builderStartedPlayingMaxDate),
    ),
  },
  buildTechniquesUsed: {
    label: 'Build techniques used',
    defaultValue: [],
    displayInDiscordMessage: arrayDiscordLine,
    validator: minItems(1),
  },
  communityAffiliations: {
    label: 'Community affiliations',
    defaultValue: [],
    displayInDiscordMessage: arrayDiscordLine,
    validator: noValidation,
  },
  labels: {
    label: 'Labels',
    defaultValue: [],
    displayInDiscordMessage: arrayDiscordLine,
    validator: noValidation,
  },
  socials: {
    label: 'Socials',
    defaultValue: [],
    displayInDiscordMessage: arrayDiscordLine,
    validator: validateForEach(multiValidation(minLength(2), shouldBeUrl)),
  },
  contactDetails: {
    label: 'Contact Details (only visible to NMSUD organisers)',
    helpText: `This is so that we can get in contact with you if there are any issue with your submissions, etc.`,
    displayInDiscordMessage: basicDiscordLine,
    validator: maxLength(builderContactDetailsMaxLength),
  },
};
