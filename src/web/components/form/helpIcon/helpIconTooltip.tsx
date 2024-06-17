// prettier-ignore
import { Box, Text, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Table, Tbody, Td, Tfoot, Tr, createDisclosure, Tooltip } from '@hope-ui/solid';
import { Component, Show } from 'solid-js';

import { HelpIcon } from '@web/components/common/icon/helpIcon';
import { preventDefault } from '@helpers/eventHelper';

interface IProps {
  helpText?: string;
}

export const HelpIconTooltip: Component<IProps> = (props: IProps) => {
  return (
    <Show when={props.helpText != null}>
      <Popover triggerMode="click">
        <PopoverTrigger as={Box} display="inline">
          <HelpIcon
            fontSize="1.25em"
            marginLeft="$1"
            paddingBottom="2px"
            tabindex="-1"
            onClick={preventDefault}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Text size="sm">{props.helpText}</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Show>
  );
};
