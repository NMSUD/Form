import { IImageRestriction } from '@validation/imageValidation';

export const AppImage = {
  socialFolder: '/assets/img/social',
  platformFolder: '/assets/img/platform',
  sidebarLogo: '/assets/img/logo.png',
  fallbackImg: '/assets/img/fallback.png',
};

export const DefaultImageRestrictions: { [prop: string]: IImageRestriction } = {
  profilePic: {
    maxHeight: 1024,
    maxWidth: 1024,
    minHeight: 256,
    minWidth: 256,
    maxSizeMb: 1,
  },
};

export const ExternalImages = {
  kurt: 'https://avatars.githubusercontent.com/u/15005470?v=4',
  lenni: 'https://avatars.githubusercontent.com/u/91371655?v=4',
  t3553ract: 'https://avatars.githubusercontent.com/u/159104713?v=4',
  assistantNMS: 'https://cdn.assistantapps.com/v2/nms/assistantNMSx100.webp',
  nmsud: 'https://avatars.githubusercontent.com/u/157403484?s=200&v=4',
  nmscd: 'https://nmscd.com/assets/favicon/favicon-96x96.png',
  eisvana:
    'https://github.com/Eisvana/eisvana.github.io/blob/main/icons/favicon-96x96.png?raw=true',
};
