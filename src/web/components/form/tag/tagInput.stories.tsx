import type { Meta, StoryObj } from 'storybook-solidjs';

import { CommunityDtoMeta } from '@contracts/dto/forms/meta/communityDto.meta';
import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormTagInput } from './tagInput';

const meta = {
  title: 'Form/TagInput',
  component: FormTagInput,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getFormInputArgTypes(),
  },
} satisfies Meta<typeof FormTagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Labels',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: CommunityDtoMeta.tags.validator,
    onChange: () => {},
  },
};

// export const WithAllPossibleIcons: Story = {
//   args: {
//     label: 'Social links',
//     placeholder: 'this is a placeholder',
//     value: socialIcons.map((s) => s.replaceAll('.svg', '.com').replaceAll('.png', '.com')),
//     validation: CommunityDtoMeta.socials.validator,
//     onChange: () => { },
//   },
// };

// export const ValidationError: Story = {
//   args: {
//     label: 'Social links',
//     placeholder: 'this is a placeholder',
//     helpText: 'This is a help icon with a tooltip',
//     showValidationMessages: true,
//     validation: () => ({
//       isValid: false,
//       errorMessage: 'example error message',
//     }),
//     onChange: () => { },
//   },
// };
