import { createRequire } from 'module';
import { type DefaultTheme } from 'vitepress';
import { vitePressRoutes } from './config.routes';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

export const nav: DefaultTheme.NavItem[] = [
  {
    ...vitePressRoutes.introduction.whatIsForm,
    text: 'Introduction',
    activeMatch: '/docs/introduction',
  },
  {
    ...vitePressRoutes.projectStructure.general,
    text: 'Project structure',
    activeMatch: '/docs/project-structure',
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
