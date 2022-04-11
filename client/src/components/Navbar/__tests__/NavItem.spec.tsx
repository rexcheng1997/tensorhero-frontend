/* eslint-disable max-len */
import { render } from '@testing-library/react';
import React from 'react';
import NavItem, { NavItemProps } from '../NavItem';

describe('<NavItem /> test suite', () => {
  const renderNavItem = (props: Partial<NavItemProps> = {}) => {
    const defaultProps: NavItemProps = {
      link: 'index.html',
      active: false,
    };

    return render(
        <NavItem {...defaultProps} {...props}>
          <span data-testid='nav-tab-child'>test</span>
        </NavItem>,
    );
  };

  it('should have class "active" when the property {active} is set to true', async () => {
    const { findByTestId } = renderNavItem({ active: true });
    const navTab = await findByTestId('nav-tab');

    expect(navTab).toHaveClass('active');
  });

  it('should not have class "active" when the property {active} is set to false', async () => {
    const { findByTestId } = renderNavItem();
    const navTab = await findByTestId('nav-tab');

    expect(navTab).not.toHaveClass('active');
  });

  it('should contain a link pointing to the property {link}', async () => {
    const link = 'public/home.html';
    const { findByTestId } = renderNavItem({ link });
    const navTab = await findByTestId('nav-tab');
    const aTag = navTab.querySelector('a');

    expect(aTag).toHaveAttribute('href', link);
  });

  it('should render its children', async () => {
    const { findByTestId } = renderNavItem({ active: true });
    const child = await findByTestId('nav-tab-child');

    expect(child).toBeInTheDocument();
  });
});
