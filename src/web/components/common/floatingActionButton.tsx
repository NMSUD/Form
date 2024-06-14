import { Button } from '@hope-ui/solid';
import { Component, JSX, Show } from 'solid-js';

interface IProps {
  ariaLabel?: string;
  icon: JSX.Element;
  colorScheme?: 'primary' | 'accent' | 'neutral' | 'success' | 'info' | 'warning' | 'danger';
  onClick: () => void;
}

export const FloatingActionButton = (props: IProps) => {
  return (
    <Button
      aria-label={props.ariaLabel ?? 'Search'}
      class="floating-button"
      colorScheme={props.colorScheme}
      onClick={props.onClick}
    >
      {props.icon}
    </Button>
  );
};
