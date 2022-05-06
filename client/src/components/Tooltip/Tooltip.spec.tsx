import React from 'react';
import { render } from '@testing-library/react';
import Tooltip, { TooltipProps } from '.';

describe('<Tooltip /> test suite', () => {
  const defaultDescription = 'test-description';
  const defaultPosition = 'top';
  const renderTooltip = (props: Partial<TooltipProps> = {}) => {
    return render(
        <div data-testid='tooltip-wrapper'>
          <Tooltip description={props.description || defaultDescription}
            position={props.position || defaultPosition}>
            <div data-testid='element'/>
          </Tooltip>
        </div>,
    );
  };

  it('should render the element passed into the tooltip', async () => {
    const { findByTestId } = renderTooltip();
    const element = await findByTestId('element');

    expect(element).toBeInTheDocument();
  });

  it('should render the description', async () => {
    const { findByText } = renderTooltip();
    const description = await findByText(defaultDescription);

    expect(description).toBeInTheDocument();
  });

  it('should have the correct position class', async () => {
    const { findByTestId } = renderTooltip();
    const tooltip = (await findByTestId('tooltip-wrapper')).firstChild;

    expect(tooltip).toHaveClass(defaultPosition);
  });
});
