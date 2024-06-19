import { IRecordRequirements } from '@api/types/baseModule';
import { BioMediaImageSize } from '@constants/image';
import { FormDtoMeta, anonymousUserGuid, contactDetails } from '@contracts/dto/forms/baseFormDto';
import {
  arrayDiscordLine,
  arrayFromDatabaseDiscordLines,
  basicDiscordLine,
} from '@helpers/discordMessageHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Builder } from '@services/external/database/xata';
import { minItems } from '@validation/arrayValidation';
import {
  multiValidation,
  noValidation,
  notNull,
  separateValidation,
  validateForEach,
} from '@validation/baseValidation';
import { maxLength, minLength } from '@validation/textValidation';
import { PlanetBuildDto } from '../planetBuildDto';

export const PlanetBuildDtoMeta: FormDtoMeta<PlanetBuildDto> = {
  id: {
    label: 'Id',
    validator: noValidation,
  },
  name: {
    label: 'Name',
    defaultValue: '',
    discord: {
      display: basicDiscordLine,
    },
    helpText: 'The IN-GAME name of the build',
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  mediaUrls: {
    label: 'Media',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    discord: {
      display: basicDiscordLine,
    },
    saveToLocalStorage: true,
    validator: noValidation,
  },
  mediaFiles: {
    label: 'Media upload',
    saveToLocalStorage: true,
    swaggerSchema: {
      type: 'array',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
    helpText: `Recommended size (width: ${BioMediaImageSize.width}, height: ${BioMediaImageSize.height})`,
    validator: separateValidation({
      Api: noValidation,
      UI: validateForEach(notNull('You need to upload an image')),
    }),
  },
  galaxy: {
    label: 'Galaxy',
    defaultValue: '',
    discord: {
      display: basicDiscordLine,
    },
    validator: notNull('You need to select a galaxy'),
  },
  systemName: {
    label: 'System Name',
    defaultValue: '',
    discord: {
      display: basicDiscordLine,
    },
    validator: minLength(2),
  },
  planetName: {
    label: 'Planet Name',
    defaultValue: '',
    discord: {
      display: basicDiscordLine,
    },
    validator: minLength(2),
  },
  coordinates: {
    label: 'Coordinates',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    discord: {
      display: basicDiscordLine,
    },
    validator: minLength(2),
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
    helpText: `Please let us know if there is a missing build technique and we will likely add your suggestion`,
    validator: minItems(1),
  },
  builders: {
    label: 'Builders who worked on this build',
    defaultValue: [],
    swaggerSchema: {
      type: 'array',
      items: { type: 'string' },
    },
    discord: {
      display: arrayFromDatabaseDiscordLines<Builder & IRecordRequirements>({
        dbCall: (id) => getDatabaseService().builder().read(id),
        mapValue: (builder) => builder.name ?? '??',
      }),
    },
    helpText: `Are you unable to find a Builder? Ask the Builder to add their profile on this site, or add it yourself on the builder form.`,
    validator: minItems(1),
  },
  contactDetails,
  anonymousUserGuid,
} as const;
