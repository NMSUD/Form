import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormLongInput } from './input';

const meta = {
  title: 'Form/Input',
  component: FormLongInput,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getFormInputArgTypes(),
    inputType: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof FormLongInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true,
  },
};

export const ValidationError: Story = {
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true,
    validation: () => ({ isValid: false, errorMessage: 'example error message' }),
  },
};
