import { Avatar, Box, Button, HStack, Text, VStack } from '@hope-ui/solid';
import { Component, Show } from 'solid-js';
import { DebugNode } from '../core/debugNode';

interface IProps {
  imgUrl: string;
  name: string;
  description: string;
  actionText?: string;
  actionTooltipText?: string;
  onClick?: () => void;
}

export const StatusTile: Component<IProps> = (props: IProps) => {
  return (
    <Box class="status-tile" maxW="350px" flex={1}>
      <DebugNode name="StatusTile" />
      <HStack
        bg="$loContrast"
        class="status-tile"
        rounded="$md"
        border="1px solid $neutral7"
        shadow="$lg"
        p="$4"
        m="$2"
      >
        <Avatar name="approval status icon" src={props.imgUrl} mr="$3" />
        <VStack alignItems="flex-start">
          <Text size="sm" fontWeight="$medium">
            {props.name}
          </Text>
          <Text size="sm" color="$neutral11">
            {props.description}
          </Text>
        </VStack>
        <Show when={props.actionText != null}>
          <Button
            variant="ghost"
            colorScheme="accent"
            size="sm"
            ml="auto"
            title={props.actionTooltipText}
            onClick={() => props.onClick?.()}
          >
            {props.actionText}
          </Button>
        </Show>
      </HStack>
    </Box>
  );
};
