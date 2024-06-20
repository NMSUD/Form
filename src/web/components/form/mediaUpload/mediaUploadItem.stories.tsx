import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormMediaUploadItem } from './mediaUploadItem';
import { MediaUploadType } from '@web/contracts/mediaUpload';

const meta = {
  title: 'Form/FormMediaUploadItem',
  component: FormMediaUploadItem,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    upload: { control: 'object' },
  },
} satisfies Meta<typeof FormMediaUploadItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    upload: {
      type: MediaUploadType.File,
      file: {
        name: 'test.png',
      },
      url: 'https://i.imgur.com/aKaOqIh.gif',
    },
  },
};

export const ImageUrl: Story = {
  args: {
    upload: {
      type: MediaUploadType.ImageUrl,
      url: 'https://i.imgur.com/aKaOqIh.gif',
    },
  },
};

export const VideoUrl: Story = {
  args: {
    upload: {
      type: MediaUploadType.VideoUrl,
      url: 'https://link.doesnt.matter.com/no-preview-anyway',
    },
  },
};
