/* eslint-disable max-len */
import React from 'react';
import { render } from '@testing-library/react';
import Snackbar, { SnackbarProps } from '.';

beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe('<Snackbar /> test suite', () => {
  const defaultPosition: SnackbarProps['position'] = 'top center';
  const mockCloseSnackbar = jest.fn();
  const renderSnackbar = (props: Partial<SnackbarProps> = {}) => {
    return render(
        <div data-testid='snackbar-wrapper'>
          <Snackbar position={defaultPosition}
            onClose={props.onClose} timeout={props.timeout}>
            <p data-testid='element'>test content</p>
          </Snackbar>
        </div>,
    );
  };

  it('should render the element passed in', async () => {
    const { findByTestId } = renderSnackbar();
    const element = await findByTestId('element');

    expect(element).toBeInTheDocument();
  });

  it('should have the correct position class', async () => {
    const { findByTestId } = renderSnackbar();
    const snackbar = (await findByTestId('snackbar-wrapper')).firstChild;

    expect(snackbar).toHaveClass(defaultPosition);
  });

  it('should call the onClose handler when timeout', async () => {
    jest.useFakeTimers();

    const defaultTimeout = 5e3;
    renderSnackbar({ onClose: mockCloseSnackbar, timeout: defaultTimeout });

    expect(mockCloseSnackbar).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1e3);
    expect(mockCloseSnackbar).not.toHaveBeenCalled();

    jest.advanceTimersByTime(defaultTimeout);
    expect(mockCloseSnackbar).toHaveBeenCalledTimes(1);
  });

  it('should do nothing if onClose handler is not specified regardless of timeout', async () => {
    jest.useFakeTimers();

    const { findByTestId } = renderSnackbar();
    const snackbar = (await findByTestId('snackbar-wrapper')).firstChild;

    expect(snackbar).toBeInTheDocument();
    expect(mockCloseSnackbar).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3e3);
    expect(snackbar).toBeInTheDocument();
    expect(mockCloseSnackbar).not.toHaveBeenCalled();
  });
});
