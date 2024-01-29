import { Component, Show } from 'solid-js';

import { Icon, Tooltip } from '@hope-ui/solid';

interface IProps {
    helpText?: string;
}

export const HelpIcon: Component<IProps> = (props: IProps) => {
    return (
        <Show when={props.helpText != null}>
            <Tooltip label={props.helpText}>
                <Icon fontSize="1.5em" marginLeft="$1" paddingBottom="2px" />
            </Tooltip>
        </Show>
    );
}