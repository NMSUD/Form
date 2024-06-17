import { themeColours } from '@constants/colour';
import { ElementType, Icon, IconProps } from '@hope-ui/solid';
import { Component } from 'solid-js';

export const InfoIcon: Component<IconProps> = <C extends ElementType = 'svg'>(
  props: IconProps<C>,
) => {
  return (
    <Icon viewBox="0 0 25 25" {...props}>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={props.color?.toString?.() ?? themeColours.primary}
        fill="transparent"
        stroke-width="1.5"
      />
      <path
        d="M12 17V11"
        stroke={props.color?.toString?.() ?? themeColours.primary}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <circle
        cx="1"
        cy="1"
        r="1"
        transform="matrix(1 0 0 -1 11 9)"
        fill={props.color?.toString?.() ?? themeColours.primary}
      />
    </Icon>
  );
};
