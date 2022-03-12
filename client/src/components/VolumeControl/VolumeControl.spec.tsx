/* eslint-disable max-len */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VolumeControl, { VolumeControlProps } from '.';
import {
  mockHTMLElementProperties,
  mockGetBoundingClientRect,
} from '__mocks__/domiscMock';

const NUMBER_OF_CALLS_ON_INITIAL_RENDER = 1;

beforeAll(() => {
  mockHTMLElementProperties({ clientWidth: 100 });
  mockGetBoundingClientRect({ x: 10 });
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<VolumeControl />', () => {
  const mockVolumeChangeEventHandler = jest.fn();
  const renderVolumeControl = (props: Partial<VolumeControlProps> = {}) => {
    const defaultProps: VolumeControlProps = {
      initialVolume: 0.8,
      onVolumeChange: mockVolumeChangeEventHandler,
    };

    return render(<VolumeControl {...defaultProps} {...props} />);
  };

  test('should turn on/off the volume when user clicks on the volume icon', async () => {
    const initialVolume = 0.8;
    const { findByTestId } = renderVolumeControl({ initialVolume });
    const volumeIcon = await findByTestId('volume-icon');

    fireEvent.click(volumeIcon);
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledTimes(NUMBER_OF_CALLS_ON_INITIAL_RENDER + 1);
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledWith(0);

    fireEvent.click(volumeIcon);
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledTimes(NUMBER_OF_CALLS_ON_INITIAL_RENDER + 2);
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledWith(initialVolume);
  });

  test('should adjust the volume when user clicks on the volume bar', async () => {
    const { findByTestId } = renderVolumeControl();
    const volumeBar = await findByTestId('volume-control-bar');

    fireEvent.click(volumeBar, { clientX: 20 });
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledTimes(NUMBER_OF_CALLS_ON_INITIAL_RENDER + 1);

    fireEvent.click(volumeBar, { clientX: 50 });
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledTimes(NUMBER_OF_CALLS_ON_INITIAL_RENDER + 2);
  });

  test('should do nothing if the volume control handle is not pressed first before dragging', async () => {
    const { findByTestId } = renderVolumeControl();
    const volumeControl = await findByTestId('volume-control');

    fireEvent.pointerMove(volumeControl);
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledTimes(NUMBER_OF_CALLS_ON_INITIAL_RENDER);
  });

  test('should adjust the volume when user presses, then drags, and finally releases the volume control handle', async () => {
    const { findByTestId } = renderVolumeControl();
    const volumeHandle = await findByTestId('volume-control-handle');
    const user = userEvent.setup();

    await user.pointer([{
      keys: '[TouchA>]', target: volumeHandle,
    }, {
      pointerName: 'TouchA', target: volumeHandle, coords: {
        clientX: 10,
      },
    }, {
      keys: '[/TouchA]',
    }]);
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledTimes(NUMBER_OF_CALLS_ON_INITIAL_RENDER + 1);

    await user.pointer([{
      keys: '[TouchB>]', target: volumeHandle,
    }, {
      pointerName: 'TouchB', target: volumeHandle, coords: {
        clientX: 30,
      },
    }, {
      keys: '[/TouchB]',
    }]);
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledTimes(NUMBER_OF_CALLS_ON_INITIAL_RENDER + 2);
  });

  test('should adjust the volume consistently when users drags the volume control handle while holding it pressed', async () => {
    const { findByTestId } = renderVolumeControl();
    const volumeHandle = await findByTestId('volume-control-handle');
    const user = userEvent.setup();
    const pointerActions = [];
    const pointerMoveTimes = 5;

    pointerActions.push({
      keys: '[TouchC>]', target: volumeHandle,
    });
    for (let i = 0; i < pointerMoveTimes; i++) {
      pointerActions.push({
        pointerName: 'TouchC', target: volumeHandle, coords: {
          clientX: (i + 1) * 10,
        },
      });
    }
    pointerActions.push({
      keys: '[/TouchC]',
    });

    await user.pointer(pointerActions);
    expect(mockVolumeChangeEventHandler).toHaveBeenCalledTimes(NUMBER_OF_CALLS_ON_INITIAL_RENDER + pointerMoveTimes);
  });
});
