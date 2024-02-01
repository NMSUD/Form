import { Community } from '@services/external/database/xata';

export const communityPublicUrlHandler = (persistence: Community): Community => {
  const localP = { ...persistence };
  if (persistence.profilePicFile != null) {
    localP.profilePicUrl = persistence.profilePicFile.url;
  }

  if (persistence.bioMediaFiles != null) {
    const bioFiles: Array<string> = [];
    for (const bioMediaFile of persistence.bioMediaFiles) {
      if (bioMediaFile.url == null) continue;
      bioFiles.push(bioMediaFile.url);
    }
    localP.bioMediaUrls = bioFiles.join(',');
  }

  return localP;
};
