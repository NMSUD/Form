import { themes } from '@storybook/theming';
import { Preview } from 'storybook-solidjs';

import '../src/scss/custom.scss';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|colour)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;
