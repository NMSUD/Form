import { PlatformType } from '@contracts/dto/enum/platformType';

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
  anonymousUserGuid: string;
  contactDetails: string;
}
