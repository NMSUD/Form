import { Avatar, Box, Icon } from '@hope-ui/solid';
import { Component, Match, Switch, createEffect, createSignal } from 'solid-js';

import { NetworkState } from '@constants/enum/networkState';
import { LoadingSpinner } from '../../core/loading';
import { AppImage } from '@constants/image';
import { DebugNode } from '@web/components/core/debugNode';

interface FormProfileImagLoading {
  imageUrl: string;
  networkState: NetworkState;
}

const getRealImgUrl = (imgUrl: string): string => {
  const isObjString =
    imgUrl === '[object Object]' ||
    (typeof imgUrl === 'object' && !Array.isArray(imgUrl) && imgUrl !== null);
  return isObjString ? AppImage.fallbackImg : imgUrl;
};

export const FormProfileImageLoading: Component<FormProfileImagLoading> = (
  props: FormProfileImagLoading,
) => {
  const [realImgUrl, setRealImgUrl] = createSignal<string>(AppImage.fallbackImg);

  createEffect(() => {
    setRealImgUrl(getRealImgUrl(props.imageUrl));
  }, [props.imageUrl]);

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
          src={realImgUrl()}
        />
      }
    >
      <Match when={props.networkState === NetworkState.Loading}>
        <Box py="2em">
          <DebugNode name={realImgUrl()} />
          <LoadingSpinner />
        </Box>
      </Match>
      <Match when={props.networkState === NetworkState.Error}>
        <Icon />
      </Match>
    </Switch>
  );
};
