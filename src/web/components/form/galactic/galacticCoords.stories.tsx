import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider, getIFormInputArgTypes } from '../../storybook';
import { GalacticCoordsInput } from './galacticCoords';

const meta = {
  title: 'Form/GalacticCoordsInput',
  component: GalacticCoordsInput,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getIFormInputArgTypes(),
  },
} satisfies Meta<typeof GalacticCoordsInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Galactic coordinates',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    onChange: () => {},
  },
};
