import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider } from '../../storybook';
import { HelpIcon } from './helpIcon';

const meta = {
  title: 'Form/HelpIcon',
  component: HelpIcon,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    helpText: { control: 'text' },
  },
} satisfies Meta<typeof HelpIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    helpText: 'This is a help icon with a tooltip',
  },
};
