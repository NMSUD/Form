import 'reflect-metadata';
import { render } from 'solid-js/web';
import { Router, hashIntegration } from '@solidjs/router';

import { AppShell } from '@web/appShell';
import { CustomThemeProvider } from '@web/themeProvider';

import './web/scss/custom.scss';

const root = document.getElementById('form-app');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <CustomThemeProvider>
    <Router source={hashIntegration()}>
      <AppShell />
    </Router>
  </CustomThemeProvider>
), root!);