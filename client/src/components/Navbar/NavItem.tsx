import React, { PropsWithChildren } from 'react';

export type NavItemProps = {
  link: string,
  active: boolean,
};

/**
 * NavItem React component
 * @param {PropsWithChildren<NavItemProps>} props
 * @return {JSX.Element}
 */
export default function NavItem({
  link, active, children,
}: PropsWithChildren<NavItemProps>): JSX.Element {
  return (
    <h2 data-testid='nav-tab'
      className={'nav-tab' + (active ? ' active' : '')}>
      <a href={link}>{children}</a>
    </h2>
  );
};
