export interface CommunityDto {
  id: string;
  name: string;
  profilePicUrl: string;
  profilePicFile: File;
  bio: string;
  bioMediaUrls: Array<string>;
  bioMediaFiles: Array<File>;
  homeGalaxy: string;
  coordinates: string;
  tags: Array<string>;
  socials: Array<string>;
  contactDetails: string;
}
