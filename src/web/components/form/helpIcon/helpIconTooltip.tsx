// prettier-ignore
import { Box, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@hope-ui/solid';
import { Component, Show } from 'solid-js';

import { preventDefault } from '@helpers/eventHelper';
import { HelpIcon } from '@web/components/common/icon/helpIcon';
import { DebugNode } from '@web/components/core/debugNode';

interface IProps {
  label: string;
  helpText?: string;
}

export const HelpIconTooltip: Component<IProps> = (props: IProps) => {
  return (
    <>
      <Text display="inline-block" title={props.helpText}>
        <DebugNode name="HelpIconTooltip" />
        {props.label}
        <Show when={props.helpText != null}>
          <Popover placement="top-start" triggerMode="click">
            <PopoverTrigger as={Box} colorScheme="info" display="inline">
              <HelpIcon
                fontSize="1.25em"
                marginLeft="$1"
                paddingBottom="2px"
                tabindex="-1"
                class="pointer"
                onClick={preventDefault}
              />
            </PopoverTrigger>
            <PopoverContent borderColor="white" bgColor="$primary6">
              <PopoverArrow />
              <PopoverBody color="white">
                <Text size="sm">{props.helpText}</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* <Text
            class="reveal pos-abs"
            top="0"
            left="120%"
            p="10px"
            borderRadius="10px"
            display="inline-block"
            width="200px"
            backgroundColor="black"
            zIndex={10}
          >
            {props.helpText}
          </Text> */}
        </Show>
      </Text>
    </>
    // <Box display="inline-block" class="pos-rel hover-reveal-child">
    // </Box>
  );
};
