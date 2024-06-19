import { Component } from 'solid-js';

interface IProps {
  name: string;
}

export const DebugNode: Component<IProps> = (props: IProps) => {
  const renderDebug = (window as unknown as { debug: boolean })?.debug === true;
  if (!renderDebug) {
    return;
  }

  return <debug>{props.name}</debug>;
};
