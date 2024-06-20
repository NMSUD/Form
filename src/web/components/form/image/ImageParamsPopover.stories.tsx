import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormProfileImageInput } from './profileImage';
import { ImageParamsPopover } from './imageParamsPopover';

const meta = {
  title: 'Form/ImageParamsPopover',
  component: ImageParamsPopover,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    imageDetails: { control: 'object' },
  },
} satisfies Meta<typeof ImageParamsPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    imageDetails: {
      width: 4321,
      height: 1234,
      fileSize: 2000,
      fileExtension: 'png',
    },
  },
};
