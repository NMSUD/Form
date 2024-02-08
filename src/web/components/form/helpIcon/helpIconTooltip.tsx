import { Component, Show } from 'solid-js';

import { Tooltip } from '@hope-ui/solid';
import { HelpIcon } from '@web/components/common/icon/helpIcon';

interface IProps {
  helpText?: string;
}

export const HelpIconTooltip: Component<IProps> = (props: IProps) => {
  return (
    <Show when={props.helpText != null}>
      <Tooltip label={props.helpText} class="noselect">
        <HelpIcon fontSize="1.25em" marginLeft="$1" paddingBottom="2px" tabindex="-1" />
      </Tooltip>
    </Show>
  );
};
