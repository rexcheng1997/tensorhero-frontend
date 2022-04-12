import './navbar.scss';

import React from 'react';
import NavItem from './NavItem';
import { resolveToBase } from 'utils/url';

export const navTabMapping = {
  'home': 'home.html',
  'generate CH level': 'generate.html',
  'charts': 'charts.html',
  'technical stuff': 'about.html',
  'help': 'help.html',
};

export type NavbarProps = {
  base: string,
};

/**
 * Navigation bar React component
 * @param {NavbarProps} props
 * @return {JSX.Element}
 */
export default function Navbar({ base }: NavbarProps): JSX.Element {
  const url = new URL(window.location.href);
  const currentPage = url.pathname.split('/').pop();

  return (
    <nav className='container flex-row align-center space-between'>
      <div className='logo-wrapper'>
        <h2 className='logo'>
          <a href={resolveToBase('home.html', base)}>Tensor Hero</a>
        </h2>
      </div>
      <div className='nav-tabs flex-row align-center justify-start'>
        {Object.entries(navTabMapping).map(([tabName, tabLink]) => (
          <NavItem key={tabName}
            link={resolveToBase(tabLink, base)}
            active={currentPage === tabLink}>
            {tabName}
          </NavItem>
        ))}
      </div>
    </nav>
  );
};
