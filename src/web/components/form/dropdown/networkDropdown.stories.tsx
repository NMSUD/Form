import type { Meta, StoryObj } from 'storybook-solidjs';

import { BuilderDtoMeta } from '@contracts/dto/forms/meta/builderDto.meta';
import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormNetworkDropdown } from './networkDropdown';
import { promiseFromResult } from '@helpers/typescriptHacks';

const meta = {
  title: 'Form/NetworkDropdown',
  component: FormNetworkDropdown,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getFormInputArgTypes(),
    multiple: { control: 'boolean' },
  },
} satisfies Meta<typeof FormNetworkDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    options: ['test1', 'test2', 'test3'].map((t) => ({ title: t, value: t })),
    optionsPromise: promiseFromResult({ isSuccess: true }),
    validation: BuilderDtoMeta.platforms.validator,
  },
};
