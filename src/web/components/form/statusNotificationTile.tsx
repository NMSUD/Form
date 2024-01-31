import { Avatar, Button, HStack, Text, VStack } from '@hope-ui/solid';
import { Component, JSX } from 'solid-js';

interface IProps {
  title: string;
  descrip: JSX.Element;
  imgUrl: string;
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
      <Avatar name={props.title} src={props.imgUrl} mr="$3" />
      <VStack alignItems="flex-start">
        <Text size="sm" fontWeight="$medium">
          {props.title}
        </Text>
        <Text size="sm" color="$neutral11">
          {props.descrip}
        </Text>
      </VStack>
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
