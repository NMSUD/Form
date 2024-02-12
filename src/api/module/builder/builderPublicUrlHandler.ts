import { Builder } from '@services/external/database/xata';

export const builderPublicUrlHandler = (persistence: Builder): Builder => {
  const localP = { ...persistence };
  if (persistence.profilePicFile != null) {
    localP.profilePicUrl = persistence.profilePicFile.url;
  }

  return localP;
};
