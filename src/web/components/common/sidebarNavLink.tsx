import { hope, Text } from '@hope-ui/solid';
import { NavLink } from '@solidjs/router';
import { ComponentProps, splitProps } from 'solid-js';

const StyledNavLinkObj = {
  baseStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    w: '$full',
    height: '$8',
    rounded: '$sm',
    bg: 'transparent',
    px: '$3',
    color: '$neutral12',
    fontSize: '$sm',
    textDecoration: 'none',
    transition: 'color 250ms, background-color 250ms',

    _hover: {
      bg: '$neutral4',
    },

    _activeLink: {
      bg: '$primary4',
      color: '$primary11',
      fontWeight: '$medium',
    },
  },
};

const StyledNavLink = hope(NavLink, StyledNavLinkObj);

type SidebarNavLinkProps = ComponentProps<typeof StyledNavLink> & {
  //
};

export const SidebarNavLink = (props: SidebarNavLinkProps) => {
  const [local, others] = splitProps(props, ['children', 'href', 'isNew']);

  return (
    <StyledNavLink href={local.href} {...others}>
      <span class="max-lines-1">{local.children}</span>
    </StyledNavLink>
  );
};

export const SidebarNavNonLink = hope(Text, {
  baseStyle: { ...StyledNavLinkObj.baseStyle, opacity: 0.5 },
});
