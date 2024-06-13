import { IRecordRequirements } from '@api/types/baseModule';
import { DefaultImageRestrictions } from '@constants/image';
import { minUrlLength } from '@constants/validation';
import { friendlyPlatformName } from '@contracts/dto/enum/platformType';
import { IFormDtoMeta, contactDetails } from '@contracts/dto/forms/baseFormDto';
import { formatForDateDropdown } from '@helpers/dateHelper';
import {
  arrayDiscordLine,
  arrayFromDatabaseDiscordLines,
  basicDiscordLine,
  shortDateDiscordLine,
  shortLinkDiscordLine,
} from '@helpers/discordMessageHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Community } from '@services/external/database/xata';
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
    discord: {
      display: shortLinkDiscordLine('click to open'),
    },
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
    discord: {
      display: basicDiscordLine,
    },
    helpText: 'Your IN-GAME character name',
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  bio: {
    label: 'Bio',
    defaultValue: '',
    discord: {
      display: basicDiscordLine,
    },
    validator: multiValidation(minLength(2), maxLength(builderBioMaxLength)),
  },
  platforms: {
    label: 'Platforms',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'number' },
    },
    discord: {
      display: (label: string, val: Array<number>) =>
        arrayDiscordLine(label, val.map(friendlyPlatformName)),
    },
    validator: minItems(1),
  },
  startedPlaying: {
    label: 'Date that you started playing',
    defaultValue: formatForDateDropdown(new Date()),
    swaggerSchema: {
      type: 'string',
      items: { format: 'date-time' },
    },
    discord: {
      label: 'Started playing',
      display: shortDateDiscordLine,
    },
    validator: multiValidation(
      minDate(builderStartedPlayingMinDate),
      maxDate(builderStartedPlayingMaxDate),
    ),
  },
  buildTechniquesUsed: {
    label: 'Build techniques used',
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
  communityAffiliations: {
    label: 'Community affiliations',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    discord: {
      display: arrayFromDatabaseDiscordLines<Community & IRecordRequirements>({
        dbCall: (id) => getDatabaseService().community().read(id),
        mapValue: (communityBuilder) => communityBuilder.name ?? '??',
      }),
    },
    helpText:
      'Are you unable to find a community? Ask the community to add it on this site, or add it yourself on the community form.',
    validator: noValidation,
  },
  labels: {
    label: 'Labels',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    discord: {
      display: arrayDiscordLine,
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
      items: { type: 'string' },
    },
    discord: {
      display: arrayDiscordLine,
    },
    validator: validateForEach(multiValidation(minLength(minUrlLength), shouldBeUrl)),
  },
  contactDetails,
} as const;
