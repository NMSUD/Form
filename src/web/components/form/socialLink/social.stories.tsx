import type { Meta, StoryObj } from 'storybook-solidjs';

import { socialIcons } from '@constants/socialIcons';
import { CommunityDtoMeta } from '@contracts/dto/forms/meta/communityDto.meta';
import { UseHopeUIThemeProvider, getFormInputArgTypes } from '../../storybook';
import { FormSocialInput } from './social';

const meta = {
  title: 'Form/SocialInput',
  component: FormSocialInput,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getFormInputArgTypes(),
  },
} satisfies Meta<typeof FormSocialInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: CommunityDtoMeta.socials.validator,
    onChange: () => {},
  },
};

export const WithAllPossibleIcons: Story = {
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    value: socialIcons.map((s) => s.replaceAll('.svg', '.com').replaceAll('.png', '.com')),
    validation: CommunityDtoMeta.socials.validator,
    onChange: () => {},
  },
};

export const ValidationError: Story = {
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true,
    validation: () => ({
      isValid: false,
      errorMessage: 'example error message',
    }),
    onChange: () => {},
  },
};
