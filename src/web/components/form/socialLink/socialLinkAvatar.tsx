import { AppImage } from '@constants/image';
import { site } from '@constants/site';
import { socialIcons } from '@constants/socialIcons';
import { Avatar, Badge, Center, Text } from '@hope-ui/solid';
import { DebugNode } from '@web/components/core/debugNode';
import { Component } from 'solid-js';
import { BasicLink } from '../../core/link';

interface IFormSocialProps {
  url: string;
  size?: '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | 'md' | 'full' | undefined;
  onChange?: () => void;
}

export const AvatarFromSocialLink: Component<IFormSocialProps> = (props: IFormSocialProps) => {
  const getImgFromUrl = (url: string): string => {
    for (const socialIconUrl of socialIcons) {
      const socialIcon = socialIconUrl.replaceAll('.svg', '').replaceAll('.png', '');
      if (url.toLocaleLowerCase().includes(socialIcon)) {
        return `${AppImage.socialFolder}/${socialIconUrl}`;
      }
    }

    return AppImage.fallbackImg;
  };

  return (
    <BasicLink
      href={props.url}
      title={props.url}
      ref={site.ref}
      additionalClassNames="hover-reveal-child pos-rel display-inline-block noselect"
      onClick={props.onChange}
    >
      <DebugNode name="AvatarFromSocialLink" />
      <Avatar
        size={props.size}
        backgroundColor="transparent"
        src={getImgFromUrl(props.url)}
        p="$1"
      />
      <Badge
        class="reveal pos-abs"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="inline-block"
        borderRadius="100%"
        textAlign="center"
        colorScheme="danger"
      >
        <Center height="100%">
          <Text size="xl">❌</Text>
        </Center>
      </Badge>
    </BasicLink>
  );
};
