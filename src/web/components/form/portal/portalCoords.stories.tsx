import type { Meta, StoryObj } from 'storybook-solidjs';

import { CommunityDtoMeta } from '@contracts/dto/forms/meta/communityDto.meta';
import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { PortalCoordInput } from './portalCoords';

const meta = {
  title: 'Form/PortalCoordsInput',
  component: PortalCoordInput,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getFormInputArgTypes(),
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
