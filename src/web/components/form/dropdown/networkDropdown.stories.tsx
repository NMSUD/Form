import type { Meta, StoryObj } from 'storybook-solidjs';

import { BuilderDtoMeta } from '@contracts/dto/forms/meta/builderDto.meta';
import { promiseFrom } from '@helpers/asyncHelper';
import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormNetworkDropdown } from './networkDropdown';

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
    optionsPromise: promiseFrom({ isSuccess: true }, 2000),
    validation: BuilderDtoMeta.platforms.validator,
  },
};
