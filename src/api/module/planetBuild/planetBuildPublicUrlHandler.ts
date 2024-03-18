import { PlanetBuild } from '@services/external/database/xata';

export const planetBuildPublicUrlHandler = (persistence: PlanetBuild): PlanetBuild => {
  const localP = { ...persistence };

  if (persistence.mediaFiles != null) {
    const bioFiles: Array<string> = [];
    for (const mediaFile of persistence.mediaFiles) {
      if (mediaFile.url == null) continue;
      bioFiles.push(mediaFile.url);
    }
    localP.mediaUrls = bioFiles.join(',');
  }

  return localP;
};
