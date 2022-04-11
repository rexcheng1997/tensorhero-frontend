/* eslint-disable max-len */
import { render } from '@testing-library/react';
import React from 'react';
import Navbar, { NavbarProps, navTabMapping } from '../Navbar';

describe('<Navbar /> test suite', () => {
  const renderNavbar = (props: NavbarProps) => {
    return render(<Navbar {...props} />);
  };

  it('should render all tabs correctly', async () => {
    const { findByText } = renderNavbar({ base: '.' });

    for (const tabText of Object.keys(navTabMapping)) {
      expect(await findByText(tabText)).toBeInTheDocument();
    }
  });

  it.each([
    'https://rexcheng1997.github.io/tensorhero-frontend/public/home.html',
    'https://rexcheng1997.github.io/tensorhero-frontend/public/charts.html',
    'https://rexcheng1997.github.io/tensorhero-frontend/public/about.html',
  ])('should highlight the tab matching the current page (%s)', async (url) => {
    window.location.assign(url);
    const currentPage = url.split('/').pop()!;
    const { findByText } = renderNavbar({ base: '.' });

    for (const [tabText, tabLink] of Object.entries(navTabMapping)) {
      const navTabInner = await findByText(tabText);

      if (tabLink === currentPage) {
        expect(navTabInner.parentElement).toHaveClass('active');
      } else {
        expect(navTabInner.parentElement).not.toHaveClass('active');
      }
    }
  });
});
