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
    text: 'Form',
    collapsed: false,
    items: [
      vitePressRoutes.form.general,
      vitePressRoutes.form.dto,
      vitePressRoutes.form.page,
      vitePressRoutes.form.apiModule,
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
  {
    text: 'Github docs',
    collapsed: true,
    items: [
      vitePressRoutes.githubDocs.contributing,
      vitePressRoutes.githubDocs.security,
      vitePressRoutes.githubDocs.codeOfConduct,
    ],
  },
];
