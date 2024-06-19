import { Button } from '@hope-ui/solid';
import classNames from 'classnames';
import { Component, JSX } from 'solid-js';

interface IProps {
  ariaLabel?: string;
  icon: JSX.Element;
  classNames?: string;
  colorScheme?: 'primary' | 'accent' | 'neutral' | 'success' | 'info' | 'warning' | 'danger';
  onClick: () => void;
}

export const FloatingActionButton: Component<IProps> = (props: IProps) => {
  return (
    <Button
      aria-label={props.ariaLabel ?? 'Search'}
      class={classNames('floating-button', props.classNames)}
      colorScheme={props.colorScheme}
      fontSize="large"
      title="Submit a bug report"
      onClick={props.onClick}
    >
      {props.icon}
    </Button>
  );
};
