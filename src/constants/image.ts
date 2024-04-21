import { IImageRestriction } from '@validation/imageValidation';

export const AppImage = {
  socialFolder: '/assets/img/social',
  platformFolder: '/assets/img/platform',
  sidebarLogo: '/assets/img/logo.png',
  fallbackImg: '/assets/img/fallback.png',
  failedToLoadImg: '/assets/img/failedToLoad.png',

  kurt: '/assets/img/about/kurt.jpg',
  lenni: '/assets/img/about/lenni.png',
  t3553ract: '/assets/img/about/t3553ract.jpg',
  eisvana: '/assets/img/social/eisvana.png',
} as const;

export const DefaultImageRestrictions: { [prop: string]: IImageRestriction } = {
  profilePic: {
    maxHeight: 1024,
    maxWidth: 1024,
    minHeight: 256,
    minWidth: 256,
    maxSizeMb: 1,
  },
} as const;

export const DefaultImageSize = {
  height: 512,
  width: 512,
} as const;

export const ExternalImages = {
  assistantNMS: 'https://cdn.assistantapps.com/v2/nms/assistantNMSx100.webp',
  nmsud: 'https://avatars.githubusercontent.com/u/157403484?s=200&v=4',
  nmscd: 'https://nmscd.com/assets/favicon/favicon-96x96.png',
} as const;
