/* eslint-disable max-len */
import Button from '.';
import React from 'react';
import { screen } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/react';

describe('<Button /> test suite', () => {
  it('should extend the default classList with className instead of overriding it', async () => {
    const classNames = 'th-tab active';
    render(<Button data-testid='button' className={classNames} />);

    const button = await screen.findByTestId('button');
    expect(button).toHaveClass(...classNames.split(' '));
  });

  it('should add attributes passed in from props to the button element', async () => {
    render(<Button data-testid='button' form='my-form' type='submit' disabled={true} />);

    const button = await screen.findByTestId('button');
    expect(button).toHaveAttribute('form', 'my-form');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('disabled');
  });

  it('should attach event listeners to the button element', async () => {
    const mockOnClickEventHandler = jest.fn();
    render(<Button data-testid='button' onClick={mockOnClickEventHandler} />);

    const button = await screen.findByTestId('button');
    expect(mockOnClickEventHandler).not.toHaveBeenCalled();

    fireEvent.click(button);
    expect(mockOnClickEventHandler).toHaveBeenCalledTimes(1);

    fireEvent.click(button);
    expect(mockOnClickEventHandler).toHaveBeenCalledTimes(2);
  });
});
