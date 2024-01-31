import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider, getIFormInputArgTypes } from '../../storybook';
import { FormProfileImageInput } from './profileImage';

const meta = {
  title: 'Form/ProfilePic',
  component: FormProfileImageInput,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getIFormInputArgTypes(),
  },
} satisfies Meta<typeof FormProfileImageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Profile Pic',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true,
  },
};

export const ValidationError: Story = {
  args: {
    label: 'Bad Profile Pic',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true,
    validation: () => ({ isValid: false, errorMessage: 'example error message' }),
  },
};
