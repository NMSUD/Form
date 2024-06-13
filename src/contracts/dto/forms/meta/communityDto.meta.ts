import { DefaultImageRestrictions } from '@constants/image';
import { minUrlLength } from '@constants/validation';
import {
  arrayDiscordLine,
  arrayOfLinksDiscordLine,
  basicDiscordLine,
  shortLinkDiscordLine,
} from '@helpers/discordMessageHelper';
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
import { makeArrayOrDefault } from '@helpers/arrayHelper';

export const communityBioMaxLength = 500;
export const communityBioMaxUploads = 5;
export const CommunityDtoMeta: IFormDtoMeta<CommunityDto> = {
  id: {
    label: 'Id',
    validator: noValidation,
  },
  profilePicUrl: {
    label: 'Profile Pic Url',
    saveToLocalStorage: true,
    discord: {
      display: shortLinkDiscordLine('click to open'),
    },
    validator: noValidation,
  },
  profilePicFile: {
    label: 'Community Logo',
    defaultValue: null,
    swaggerSchema: {
      type: 'string',
      format: 'binary',
    },
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
    discord: {
      display: basicDiscordLine,
    },
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  bio: {
    label: 'Bio',
    defaultValue: '',
    discord: {
      display: basicDiscordLine,
    },
    validator: multiValidation(minLength(2), maxLength(communityBioMaxLength)),
  },
  bioMediaUrls: {
    label: 'Bio Media',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    discord: {
      display: arrayOfLinksDiscordLine,
    },
    saveToLocalStorage: true,
    validator: noValidation,
  },
  bioMediaFiles: {
    label: 'Media upload',
    swaggerSchema: {
      $ref: '#/components/schemas/IMediaUpload',
    },
    validator: maxItems(communityBioMaxUploads),
    // TODO Add server validation of max file size
  },
  homeGalaxy: {
    label: 'Home Galaxy',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    discord: {
      display: (label: string, value: any) =>
        basicDiscordLine(label, makeArrayOrDefault(value).join('')),
    },
    validator: noValidation,
  },
  coordinates: {
    label: 'Coordinates',
    defaultValue: '',
    discord: {
      display: basicDiscordLine,
    },
    helpText:
      'You can use the buttons below to input the glyphs or the numbers along with "abcde" on your keyboard.',
    validator: noValidation,
  },
  tags: {
    label: 'Tags',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    discord: {
      display: arrayDiscordLine,
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
    discord: {
      display: arrayDiscordLine,
    },
    helpText: `Add links by pressing the "ENTER" key or clicking the arrow on the right hand side. These links will be displayed as icons, if we are missing a customised icon for a link, please feel free to let us know if the feedback page!`,
    validator: multiValidation(
      minItems(1),
      maxItems(10),
      validateForEach(
        multiValidation(
          minLength(minUrlLength), //
          shouldBeUrl,
        ),
      ),
    ),
  },
  contactDetails,
} as const;
