import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider, getIFormInputArgTypes } from '../../storybook';
import { PortalCoordInput } from './portalCoords';
import { CommunityDtoMeta } from '@contracts/dto/forms/communityDto';
import { socialIcons } from '@constants/socialIcons';

const meta = {
  title: 'Form/PortalCoordsInput',
  component: PortalCoordInput,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getIFormInputArgTypes(),
  },
} satisfies Meta<typeof PortalCoordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: CommunityDtoMeta.socials.validator,
    onChange: () => {},
  },
};
