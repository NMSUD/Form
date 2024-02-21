import { IFormPersistenceMeta } from '@contracts/dto/forms/baseFormDto';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import {
  arrayDiscordLine,
  arrayFromDatabaseDiscordLines,
  basicDiscordLine,
  shortDateDiscordLine,
  shortLinkDiscordLine,
} from '@helpers/discordMessageHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Community } from '@services/external/database/xata';
import { IRecordRequirements } from '../../types/baseModule';
import { friendlyPlatformName } from '@contracts/dto/enum/platformType';

export const BuilderPersistenceMeta: IFormPersistenceMeta<BuilderDto> = {
  profilePicUrl: {
    displayInDiscordMessage: shortLinkDiscordLine('click to open'),
  },
  profilePicFile: {},
  name: {
    displayInDiscordMessage: basicDiscordLine,
  },
  bio: {
    displayInDiscordMessage: basicDiscordLine,
  },
  platforms: {
    displayInDiscordMessage: (label: string, val: Array<number>) =>
      arrayDiscordLine(label, val.map(friendlyPlatformName)),
  },
  startedPlaying: {
    label: 'Started playing',
    displayInDiscordMessage: shortDateDiscordLine,
  },
  buildTechniquesUsed: {
    displayInDiscordMessage: arrayDiscordLine,
  },
  communityAffiliations: {
    displayInDiscordMessage: arrayFromDatabaseDiscordLines<Community & IRecordRequirements>({
      dbCall: (id) => getDatabaseService().community().read(id),
      mapValue: (communityBuilder) => communityBuilder.name ?? '??',
    }),
  },
  labels: {
    displayInDiscordMessage: arrayDiscordLine,
  },
  socials: {
    displayInDiscordMessage: arrayDiscordLine,
  },
  contactDetails: {
    label: 'Contact Details',
    displayInDiscordMessage: basicDiscordLine,
  },
};
