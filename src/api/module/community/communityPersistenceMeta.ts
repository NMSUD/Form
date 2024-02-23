import { IFormPersistenceMeta } from '@contracts/dto/forms/baseFormDto';
import { CommunityDto } from '@contracts/dto/forms/communityDto';
import {
  arrayDiscordLine,
  basicDiscordLine,
  shortLinkDiscordLine,
} from '@helpers/discordMessageHelper';

export const CommunityPersistenceMeta: IFormPersistenceMeta<CommunityDto> = {
  profilePicUrl: {
    displayInDiscordMessage: shortLinkDiscordLine('click to open'),
  },
  name: {
    displayInDiscordMessage: basicDiscordLine,
  },
  bio: {
    displayInDiscordMessage: basicDiscordLine,
  },
  bioMediaUrls: {
    displayInDiscordMessage: arrayDiscordLine,
  },
  homeGalaxy: {
    // displayInDiscordMessage: arrayDiscordLine,
  },
  tags: {
    displayInDiscordMessage: arrayDiscordLine,
  },
  socials: {
    displayInDiscordMessage: arrayDiscordLine,
  },
  contactDetails: {
    displayInDiscordMessage: basicDiscordLine,
  },
};
