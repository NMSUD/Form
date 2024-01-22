import { render } from 'solid-js/web';
import { AppShell } from './components/appShell';
import { CustomThemeProvider } from './components/themeProvider';
import { HashRouter } from '@solidjs/router';

const root = document.getElementById('form-app');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <CustomThemeProvider>
    <HashRouter >
      <AppShell />
    </HashRouter >
  </CustomThemeProvider>
), root!);