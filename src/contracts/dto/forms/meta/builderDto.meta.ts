import { DefaultImageRestrictions } from '@constants/image';
import { IFormDtoMeta, contactDetails } from '@contracts/dto/forms/baseFormDto';
import { formatForDateDropdown } from '@helpers/dateHelper';
import { minItems } from '@validation/arrayValidation';
import {
  multiValidation,
  noValidation,
  notNull,
  separateValidation,
  validateForEach,
} from '@validation/baseValidation';
import { maxDate, minDate } from '@validation/dateValidation';
import { webImageRestrictions } from '@validation/imageValidation';
import { maxLength, minLength, shouldBeUrl } from '@validation/textValidation';
import { BuilderDto } from '../builderDto';

export const builderBioMaxLength = 500;
export const builderStartedPlayingMinDate = new Date('2016-08-09');
export const builderStartedPlayingMaxDate = new Date();

export const BuilderDtoMeta: IFormDtoMeta<BuilderDto> = {
  id: {
    label: 'Id',
    validator: noValidation,
  },
  profilePicUrl: {
    label: 'Profile Pic Url',
    saveToLocalStorage: true,
    validator: noValidation,
  },
  profilePicFile: {
    label: 'Profile picture',
    swaggerSchema: {
      type: 'binary',
    },
    defaultValue: null,
    saveToLocalStorage: true,
    validator: separateValidation({
      Api: noValidation,
      UI: multiValidation(
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
    swaggerSchema: {
      type: 'array',
      itemsType: 'number',
    },
    validator: minItems(1),
  },
  startedPlaying: {
    label: 'Date that you started playing',
    swaggerSchema: {
      type: 'string',
      itemsFormat: 'date-time',
    },
    defaultValue: formatForDateDropdown(new Date()),
    validator: multiValidation(
      minDate(builderStartedPlayingMinDate),
      maxDate(builderStartedPlayingMaxDate),
    ),
  },
  buildTechniquesUsed: {
    label: 'Build techniques used',
    swaggerSchema: {
      type: 'array',
      itemsType: 'string',
    },
    defaultValue: [],
    validator: minItems(1),
  },
  communityAffiliations: {
    label: 'Community affiliations',
    swaggerSchema: {
      type: 'array',
      itemsType: 'string',
    },
    defaultValue: [],
    helpText:
      'Are you unable to find a community? Ask the community to add it on this site, or add it yourself on the community form.',
    validator: noValidation,
  },
  labels: {
    label: 'Labels',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      itemsType: 'string',
    },
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
    swaggerSchema: {
      type: 'array',
      itemsType: 'string',
    },
    validator: validateForEach(multiValidation(minLength(2), shouldBeUrl)),
  },
  contactDetails,
};
