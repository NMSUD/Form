import { DefaultImageRestrictions } from '@constants/image';
import { PlatformType } from '@contracts/dto/enum/platformType';
import { IFormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import { formatForDateDropdown } from '@helpers/dateHelper';
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
  id: string;
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
  id: {
    label: 'Id',
    validator: noValidation,
  },
  profilePicUrl: {
    label: 'Profile Pic Url',
    dontSaveToLocalStorage: true,
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
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  bio: {
    label: 'Bio',
    defaultValue: '',
    validator: multiValidation(minLength(2), maxLength(builderBioMaxLength)),
  },
  platforms: {
    label: 'Platforms',
    defaultValue: [],
    validator: minItems(1),
  },
  startedPlaying: {
    label: 'Date that you started playing',
    defaultValue: formatForDateDropdown(new Date()),
    validator: multiValidation(
      minDate(builderStartedPlayingMinDate),
      maxDate(builderStartedPlayingMaxDate),
    ),
  },
  buildTechniquesUsed: {
    label: 'Build techniques used',
    defaultValue: [],
    validator: minItems(1),
  },
  communityAffiliations: {
    label: 'Community affiliations',
    defaultValue: [],
    validator: noValidation,
  },
  labels: {
    label: 'Labels',
    defaultValue: [],
    validator: multiValidation(
      minItems(1),
      validateForEach(
        minLength(1), //
      ),
    ),
  },
  socials: {
    label: 'Socials',
    defaultValue: [],
    validator: validateForEach(multiValidation(minLength(2), shouldBeUrl)),
  },
  contactDetails: {
    label: 'Contact Details (only visible to NMSUD organisers)',
    helpText: `This is so that we can get in contact with you if there are any issue with your submissions, etc.`,
    defaultValue: '',
    validator: maxLength(builderContactDetailsMaxLength),
  },
};
