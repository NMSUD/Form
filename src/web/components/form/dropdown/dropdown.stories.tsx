import type { Meta, StoryObj } from 'storybook-solidjs';

import { BuilderDtoMeta } from '@contracts/dto/forms/meta/builderDto.meta';
import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormDropdown } from './dropdown';

const meta = {
  title: 'Form/Dropdown',
  component: FormDropdown,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getFormInputArgTypes(),
  },
} satisfies Meta<typeof FormDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    options: ['test1', 'test2', 'test3'].map((t) => ({ title: t, value: t })),
    validation: BuilderDtoMeta.platforms.validator,
  },
};

export const Multiple: Story = {
  args: {
    label: 'Name',
    multiple: true,
    placeholder: 'this is a placeholder',
    options: ['test1', 'test2', 'test3'].map((t) => ({ title: t, value: t })),
    validation: BuilderDtoMeta.platforms.validator,
  },
};

export const ValidationError: Story = {
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    showValidationMessages: true,
    options: ['test1', 'test2', 'test3'].map((t) => ({ title: t, value: t })),
    validation: () => ({ isValid: false, errorMessage: 'example error message' }),
  },
};
