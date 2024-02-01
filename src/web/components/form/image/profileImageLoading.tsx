import { Avatar, Box, Icon } from '@hope-ui/solid';
import { Component, Match, Switch } from 'solid-js';

import { NetworkState } from '@constants/enum/networkState';
import { LoadingSpinner } from '../../core/loading';

interface FormProfileImagLoading {
  imageUrl: string;
  networkState: NetworkState;
}

export const FormProfileImageLoading: Component<FormProfileImagLoading> = (
  props: FormProfileImagLoading,
) => {
  return (
    <Switch
      fallback={
        <Avatar
          mt="$3"
          size="xl"
          name="+"
          class="noselect no-drag"
          draggable={false}
          borderRadius="0.25em"
          src={props.imageUrl}
        />
      }
    >
      <Match when={props.networkState === NetworkState.Loading}>
        <Box pt="2em">
          <LoadingSpinner />
        </Box>
      </Match>
      <Match when={props.networkState === NetworkState.Error}>
        <Icon />
      </Match>
    </Switch>
  );
};
