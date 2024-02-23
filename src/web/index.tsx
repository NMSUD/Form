import 'reflect-metadata';
import { render } from 'solid-js/web';
import { Router, hashIntegration } from '@solidjs/router';

import { AppShell } from '@web/components/appShell';
import { CustomThemeProvider } from '@web/components/themeProvider';
import { AssistantAppsAppNoticeList } from '@web/types/assistantApps';

import './scss/custom.scss';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      ['assistant-apps-app-notice-list']: AssistantAppsAppNoticeList;
    }
  }
}

const root = document.getElementById('form-app');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <CustomThemeProvider>
      <Router source={hashIntegration()}>
        <AppShell />
      </Router>
    </CustomThemeProvider>
  ),
  root!,
);
