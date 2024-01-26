import { Component, Show } from 'solid-js';

import { Icon, Tooltip } from '@hope-ui/solid';

interface IProps {
    helpText?: string;
}

export const HelpIcon: Component<IProps> = (props: IProps) => {
    return (
        <Show when={props.helpText != null}>
            <Tooltip label={props.helpText}>
                <Icon />
            </Tooltip>
        </Show>
    );
}