import { Anchor, Avatar, Button, HStack, Text, VStack } from '@hope-ui/solid';
import { Component, JSX } from 'solid-js';
import { BasicLink } from '../core/link';

interface IProps {
  title: string;
  descrip: JSX.Element;
  imgUrl: string;
  href: string;
  close: () => void;
}

export const StatusNotificationTile: Component<IProps> = (props: IProps) => {
  return (
    <HStack
      bg="$loContrast"
      rounded="$md"
      border="1px solid $neutral7"
      shadow="$lg"
      p="$4"
      w="$full"
    >
      <BasicLink
        href={props.href}
        title="View status"
        disableRef={true}
        additionalClassNames="noselect"
      >
        <Avatar name={props.title} src={props.imgUrl} mr="$3" />
      </BasicLink>
      <BasicLink
        href={props.href}
        title="View status"
        disableRef={true}
        additionalClassNames="noselect"
      >
        <VStack alignItems="flex-start">
          <Text size="sm" textDecoration="none" color="white" fontWeight="$medium">
            {props.title}
          </Text>
          <Text size="sm" color="$neutral11">
            {props.descrip}
          </Text>
        </VStack>
      </BasicLink>
      <Button
        variant="ghost"
        colorScheme="accent"
        size="sm"
        ml="auto"
        onClick={() => props.close()}
      >
        Dismiss
      </Button>
    </HStack>
  );
};
