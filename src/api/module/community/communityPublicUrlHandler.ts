import { minUrlLength } from '@constants/validation';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { Community } from '@services/external/database/xata';

export const communityPublicUrlHandler = (persistence: Community): Community => {
  const localP = { ...persistence };
  if (persistence.profilePicFile != null) {
    localP.profilePicUrl = persistence.profilePicFile.url;
  }

  if (persistence.bioMediaFiles != null) {
    const bioFiles: Array<string> = makeArrayOrDefault(persistence.bioMediaUrls);
    for (const bioMediaFile of persistence.bioMediaFiles) {
      if (bioMediaFile.url == null || bioMediaFile.url.length < minUrlLength) continue;
      bioFiles.push(bioMediaFile.url);
    }
    localP.bioMediaUrls = bioFiles.filter((b) => (b?.length ?? 0) > 0).join(',');
  }

  return localP;
};
