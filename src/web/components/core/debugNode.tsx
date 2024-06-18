import { Component } from 'solid-js';

import { getConfig } from '@services/internal/configService';

interface IProps {
  name: string;
}

export const DebugNode: Component<IProps> = (props: IProps) => {
  const renderDebug =
    getConfig().isProd() != true || (window as unknown as { debug: boolean }).debug == true;
  if (!renderDebug) {
    return;
  }

  return <debug>{props.name}</debug>;
};
