import type { Meta, StoryObj } from 'storybook-solidjs';

import { BuilderDtoMeta } from '@contracts/dto/forms/meta/builderDto.meta';
import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { PlatformTypeDropdown } from './platformTypeDropdown';

const meta = {
  title: 'Form/PlatformTypeDropdown',
  component: PlatformTypeDropdown,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getFormInputArgTypes(),
  },
} satisfies Meta<typeof PlatformTypeDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: BuilderDtoMeta.platforms.validator,
  },
};

export const Multiple: Story = {
  args: {
    label: 'Name',
    multiple: true,
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: BuilderDtoMeta.platforms.validator,
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
