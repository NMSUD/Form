import { Box } from '@hope-ui/solid';
import { Component, JSX } from 'solid-js';

interface IProps {
  class?: string;
  children: JSX.Element;
}

export const Card: Component<IProps> = (props: IProps) => {
  return (
    <Box
      class={`card ${props.class}`}
      border="1px solid $neutral5"
      p="$4"
      borderTopRadius="$lg"
      borderBottomRadius="$lg"
      overflowY="auto"
    >
      {props.children}
    </Box>
  );
};
