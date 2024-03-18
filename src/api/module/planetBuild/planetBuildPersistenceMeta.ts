import { IRecordRequirements } from '@api/types/baseModule';
import { IFormPersistenceMeta } from '@contracts/dto/forms/baseFormDto';
import { PlanetBuildDto } from '@contracts/dto/forms/planetBuildDto';
import {
  arrayDiscordLine,
  arrayFromDatabaseDiscordLines,
  basicDiscordLine,
} from '@helpers/discordMessageHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Builder } from '@services/external/database/xata';

export const PlanetBuildPersistenceMeta: IFormPersistenceMeta<PlanetBuildDto> = {
  name: {
    displayInDiscordMessage: basicDiscordLine,
  },
  mediaUrls: {
    displayInDiscordMessage: arrayDiscordLine,
  },
  galaxy: {
    displayInDiscordMessage: basicDiscordLine,
  },
  systemName: {
    displayInDiscordMessage: basicDiscordLine,
  },
  planetName: {
    displayInDiscordMessage: basicDiscordLine,
  },
  coordinates: {
    displayInDiscordMessage: basicDiscordLine,
  },
  buildTechniquesUsed: {
    displayInDiscordMessage: arrayDiscordLine,
  },
  builders: {
    displayInDiscordMessage: arrayFromDatabaseDiscordLines<Builder & IRecordRequirements>({
      dbCall: (id) => getDatabaseService().builder().read(id),
      mapValue: (builder) => builder.name ?? '??',
    }),
  },
  contactDetails: {
    displayInDiscordMessage: basicDiscordLine,
  },
};
