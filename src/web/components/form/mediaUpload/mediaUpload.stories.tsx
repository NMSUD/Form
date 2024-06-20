import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormMediaUploadInput } from './mediaUpload';
import { MediaUploadType } from '@web/contracts/mediaUpload';

const meta = {
  title: 'Form/FormMediaUploadInput',
  component: FormMediaUploadInput,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getFormInputArgTypes(),
    maxUploads: { control: 'number' },
  },
} satisfies Meta<typeof FormMediaUploadInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Upload your media',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true,
  },
};

export const NumberOfFilesLimit: Story = {
  args: {
    label: 'Upload your media',
    helpText: 'This is a help icon with a tooltip',
    maxUploads: 4,
    showValidationMessages: true,
  },
};

export const UploadsAdded: Story = {
  args: {
    label: 'Upload your media',
    helpText: 'This is a help icon with a tooltip',
    maxUploads: 2,
    value: [
      {
        type: MediaUploadType.ImageUrl,
        url: 'https://i.imgur.com/aKaOqIh.gif',
      },
    ],
    showValidationMessages: true,
  },
};

export const ValidationError: Story = {
  args: {
    label: 'Upload your media',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true,
    validation: () => ({ isValid: false, errorMessage: 'example error message' }),
  },
};
