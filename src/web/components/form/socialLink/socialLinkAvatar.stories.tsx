import type { Meta, StoryObj } from 'storybook-solidjs';

import { UseHopeUIThemeProvider } from '../../storybook';
import { AvatarFromSocialLink } from './socialLinkAvatar';

const meta = {
  title: 'Form/SocialInputLinkAvatar',
  component: AvatarFromSocialLink,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    url: { control: 'text' },
    size: { control: 'text' },
  },
} satisfies Meta<typeof AvatarFromSocialLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AssistantApps: Story = {
  args: {
    url: 'https://assistantapps.com',
  },
};

export const Reddit: Story = {
  args: {
    url: 'https://reddit.com',
  },
};

export const Facebook: Story = {
  args: {
    url: 'https://facebook.com',
  },
};
