export interface PlanetBuildDto {
  id: string;
  name: string;
  mediaUrls: Array<string>;
  mediaFiles: Array<File>;
  galaxy: string;
  systemName: string;
  planetName: string;
  coordinates: string;
  buildTechniquesUsed: Array<string>;
  builders: Array<string>;
  anonymousUserGuid: string;
  contactDetails: string;
}
