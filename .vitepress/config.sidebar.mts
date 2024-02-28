import { type DefaultTheme } from 'vitepress';
import { vitePressRoutes } from './config.routes.mts';

export const sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    collapsed: false,
    items: [
      vitePressRoutes.introduction.whatIsForm,
      vitePressRoutes.introduction.gettingStarted,
      vitePressRoutes.introduction.environmentVariables,
      vitePressRoutes.introduction.packageJson,
    ],
  },
  {
    text: 'Project structure',
    collapsed: false,
    items: [
      vitePressRoutes.projectStructure.general,
      vitePressRoutes.projectStructure.dependencyInjection,
      //   vitePressRoutes.projectStructure.api,
      //   vitePressRoutes.projectStructure.data,
      //   vitePressRoutes.projectStructure.web,
      vitePressRoutes.projectStructure.standards,
    ],
  },
  {
    text: 'Testing',
    collapsed: false,
    items: [
      vitePressRoutes.testing.unitTests,
      vitePressRoutes.testing.coverageReport,
      vitePressRoutes.testing.storybook,
    ],
  },
  {
    text: 'Deploying',
    collapsed: false,
    items: [
      vitePressRoutes.deploying.githubActions, //
      vitePressRoutes.deploying.docker,
    ],
  },
];
