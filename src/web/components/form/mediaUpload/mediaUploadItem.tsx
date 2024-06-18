import { Anchor, Avatar, Box, Center, Flex, Text, Tooltip } from '@hope-ui/solid';
import { Component, Match, Switch } from 'solid-js';

import { OpenInNewIcon } from '@web/components/common/icon/openInNewIcon';
import { WrapWhen } from '@web/components/common/wrapWhen';
import { IMediaUpload, MediaUploadType } from '@web/contracts/mediaUpload';

interface IProps {
  upload: IMediaUpload;
  removeItem: () => void;
}

export const FormMediaUploadItem: Component<IProps> = (props: IProps) => {
  return (
    <Box class="hover-reveal-child pos-rel display-inline-block noselect">
      <Switch fallback={<Text display="inline-block">???</Text>}>
        <Match when={props.upload.type === MediaUploadType.ImageUrl}>
          <Avatar
            name={props.upload.url}
            src={props.upload.url}
            maxWidth="3em"
            maxHeight="3em"
            borderRadius="6px"
            class="aspect-ratio-square"
          />
        </Match>
        <Match when={props.upload.type === MediaUploadType.VideoUrl}>
          <Center height="100%" backgroundColor="$neutral6" borderRadius="5px">
            <Anchor href={props.upload.url} external px="1em">
              Video <OpenInNewIcon />
            </Anchor>
          </Center>
        </Match>
        <Match when={props.upload.type === MediaUploadType.File}>
          <Flex flexDirection="row" backgroundColor="$neutral6" borderRadius="5px">
            <Avatar
              flex={1}
              mr="$2"
              name={props.upload.url}
              src={props.upload.url}
              maxWidth="3em"
              maxHeight="3em"
              borderRadius="6px"
              class="aspect-ratio-square"
            />
            <Center flex={4} maxWidth="10em" overflow="hidden">
              <WrapWhen
                condition={props.upload.file?.name != null}
                wrapComp={Tooltip}
                wrapProps={{ label: props.upload.file?.name }}
              >
                <Text class="max-lines-1">{props.upload.file?.name ?? 'unknown name'}</Text>
              </WrapWhen>
            </Center>
          </Flex>
        </Match>
      </Switch>
      <Center
        class="reveal pos-abs"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundColor="$danger6"
        borderRadius="5px"
        onClick={() => props.removeItem()}
      >
        <Text size="xl">❌</Text>
      </Center>
    </Box>
  );
};
