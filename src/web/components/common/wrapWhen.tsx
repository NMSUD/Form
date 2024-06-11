import { Component, JSX, Show } from 'solid-js';

interface IHasChildrenProps {
  children: JSX.Element;
}

interface IProps<T> {
  condition: boolean;
  children: JSX.Element;
  wrapProps: T;
  wrapComp: Component<IHasChildrenProps>;
}

export const WrapWhen = <T,>(props: IProps<T>) => {
  const WrapChild = props.wrapComp;
  return (
    <Show when={props.condition} fallback={props.children}>
      <WrapChild {...props.wrapProps}>{props.children}</WrapChild>
    </Show>
  );
};
