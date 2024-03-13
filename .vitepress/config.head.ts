import { HeadConfig } from 'vitepress';

const faviconPath = (suffix: string) => `/assets/favicon/${suffix}`;

const icon = (filename: string, size: string) => ({
  rel: 'icon',
  type: 'image/png',
  sizes: size,
  href: faviconPath(filename),
});

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', type: 'image/x-icon', href: faviconPath('favicon.ico') }],
  ['link', icon('favicon-16x16.png', '16x16')],
  ['link', icon('favicon-32x32.png', '32x32')],
  ['link', icon('favicon-96x96.png', '96x96')],
];
