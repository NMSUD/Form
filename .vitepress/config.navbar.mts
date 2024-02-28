import { createRequire } from 'module';
import { type DefaultTheme } from 'vitepress';
import { vitePressRoutes } from './config.routes.mts';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

export const nav: DefaultTheme.NavItem[] = [
  vitePressRoutes.home,
  {
    text: 'Examples',
    link: '/docs/markdown-examples',
    activeMatch: '/examples/',
  },
  {
    text: pkg.version,
    items: [
      {
        text: 'Changelog',
        link: 'https://github.com/NMSUD/Form/blob/main/CHANGELOG.md',
      },
      {
        text: 'Contributing',
        link: 'https://github.com/NMSUD/Form/blob/main/.github/CONTRIBUTING.md',
      },
    ],
  },
];
