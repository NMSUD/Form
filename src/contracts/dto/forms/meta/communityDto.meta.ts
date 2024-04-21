import { DefaultImageRestrictions } from '@constants/image';
import { maxItems, minItems } from '@validation/arrayValidation';
import {
  multiValidation,
  noValidation,
  notNull,
  separateValidation,
  validateForEach,
} from '@validation/baseValidation';
import { webImageRestrictions } from '@validation/imageValidation';
import { maxLength, minLength, shouldBeUrl } from '@validation/textValidation';
import { IFormDtoMeta, contactDetails } from '../baseFormDto';
import { CommunityDto } from '../communityDto';

export const communityBioMaxLength = 500;
export const CommunityDtoMeta: IFormDtoMeta<CommunityDto> = {
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
    defaultValue: null,
    swaggerSchema: {
      type: 'string',
      format: 'binary',
    },
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
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  bio: {
    label: 'Bio',
    defaultValue: '',
    validator: multiValidation(minLength(2), maxLength(communityBioMaxLength)),
  },
  bioMediaUrls: {
    label: 'Bio Media',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    saveToLocalStorage: true,
    validator: noValidation,
  },
  bioMediaFiles: {
    label: 'Media upload',
    swaggerSchema: {
      type: 'array',
      items: { type: 'string', format: 'binary' },
    },
    saveToLocalStorage: true,
    validator: separateValidation({
      Api: noValidation,
      UI: validateForEach(notNull('You need to upload an image')),
    }),
  },
  homeGalaxy: {
    label: 'Home Galaxy',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    validator: noValidation,
  },
  coordinates: {
    label: 'Coordinates',
    defaultValue: '',
    validator: noValidation,
  },
  tags: {
    label: 'Tags',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    validator: minItems(1),
  },
  socials: {
    label: 'Socials',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    helpText: `Add links by pressing the "ENTER" key or clicking the arrow on the right hand side. These links will be displayed as icons, if we are missing a customised icon for a link, please feel free to let us know if the feedback page!`,
    validator: multiValidation(
      minItems(1),
      maxItems(10),
      validateForEach(multiValidation(minLength(2), shouldBeUrl)),
    ),
  },
  contactDetails,
} as const;
