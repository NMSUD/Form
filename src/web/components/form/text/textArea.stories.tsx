import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormTextArea } from './textArea';
import { maxLength } from '@validation/textValidation';

const meta = {
  title: 'Form/TextArea',
  component: FormTextArea,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getFormInputArgTypes(),
  },
} satisfies Meta<typeof FormTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: maxLength(200),
  },
};

export const ShowTextCount: Story = {
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: maxLength(200),
    displayTextLength: true,
    maxTextLength: 200,
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
