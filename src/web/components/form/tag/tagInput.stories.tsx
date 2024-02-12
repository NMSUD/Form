import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider, getIFormInputArgTypes } from '../../storybook';
import { CommunityDtoMeta } from '@contracts/dto/forms/communityDto';
import { socialIcons } from '@constants/socialIcons';
import { FormTagInput } from './tagInput';

const meta = {
  title: 'Form/TagInput',
  component: FormTagInput,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getIFormInputArgTypes(),
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
    onChange: () => { },
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
