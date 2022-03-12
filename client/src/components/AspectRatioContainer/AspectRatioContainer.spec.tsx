import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AspectRatioContainer, { AspectRatioContainerProps } from '.';
import { mockHTMLElementProperties } from '__mocks__/domiscMock';

type Props = React.PropsWithChildren<AspectRatioContainerProps>;

const PARENT_CONTAINER_WIDTH = 1024;

beforeAll(() => {
  mockHTMLElementProperties({ clientWidth: PARENT_CONTAINER_WIDTH });
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<AspectRatioContainer />', () => {
  const mockClickEventHandler = jest.fn();
  const mockPointerUpEventHandler = jest.fn();
  const mockPointerMoveEventHandler = jest.fn();
  const mockPointerLeaveEventHandler = jest.fn();
  const renderAspectRatioContainer = (
      parentWidth: number,
      props: Partial<Props> = {},
  ) => {
    const defaultProps: Props = {
      ratio: 1,
      onClick: mockClickEventHandler,
      onPointerUp: mockPointerUpEventHandler,
      onPointerMove: mockPointerMoveEventHandler,
      onPointerLeave: mockPointerLeaveEventHandler,
    };

    return render(
        <div data-testid='parent-container' style={{ width: parentWidth }}>
          <AspectRatioContainer {...defaultProps} {...props} />
        </div>,
    );
  };

  test('should have equal width and height when ratio = 1', async () => {
    const { findByTestId } = renderAspectRatioContainer(PARENT_CONTAINER_WIDTH);
    const container = await findByTestId('aspect-ratio-container');

    expect(container.clientHeight).toBe(container.clientWidth);
  });

  test('width should equal triple height when ratio = 3', async () => {
    const { findByTestId } = renderAspectRatioContainer(
        PARENT_CONTAINER_WIDTH, { ratio: 3 },
    );
    const container = await findByTestId('aspect-ratio-container');

    expect(3 * container.clientHeight).toBe(container.clientWidth);
  });

  test('should trigger the event handler on click', async () => {
    const { findByTestId } = renderAspectRatioContainer(PARENT_CONTAINER_WIDTH);
    const container = await findByTestId('aspect-ratio-container');

    fireEvent.click(container);
    expect(mockClickEventHandler).toHaveBeenCalledTimes(1);

    fireEvent.click(container);
    expect(mockClickEventHandler).toHaveBeenCalledTimes(2);
  });

  test('should trigger the event handler on pointer up', async () => {
    const { findByTestId } = renderAspectRatioContainer(PARENT_CONTAINER_WIDTH);
    const container = await findByTestId('aspect-ratio-container');

    fireEvent.pointerUp(container);
    expect(mockPointerUpEventHandler).toHaveBeenCalledTimes(1);

    fireEvent.pointerUp(container);
    expect(mockPointerUpEventHandler).toHaveBeenCalledTimes(2);
  });

  test('should trigger the event handler on pointer move', async () => {
    const { findByTestId } = renderAspectRatioContainer(PARENT_CONTAINER_WIDTH);
    const container = await findByTestId('aspect-ratio-container');

    fireEvent.pointerMove(container);
    expect(mockPointerMoveEventHandler).toHaveBeenCalledTimes(1);

    fireEvent.pointerMove(container);
    expect(mockPointerMoveEventHandler).toHaveBeenCalledTimes(2);
  });

  test('should trigger the event handler on pointer leave', async () => {
    const { findByTestId } = renderAspectRatioContainer(PARENT_CONTAINER_WIDTH);
    const container = await findByTestId('aspect-ratio-container');

    fireEvent.pointerLeave(container);
    expect(mockPointerLeaveEventHandler).toHaveBeenCalledTimes(1);

    fireEvent.pointerLeave(container);
    expect(mockPointerLeaveEventHandler).toHaveBeenCalledTimes(2);
  });

  test('should resize accordingly on window resize', async () => {
    const { findByTestId } = renderAspectRatioContainer(
        PARENT_CONTAINER_WIDTH, { ratio: 2 },
    );
    const parent = await findByTestId('parent-container');
    const container = await findByTestId('aspect-ratio-container');

    parent.style.width = '680px';
    fireEvent.resize(window);
    expect(container.clientHeight).toBe(container.clientWidth / 2);

    parent.style.width = '420px';
    fireEvent.resize(window);
    expect(container.clientHeight).toBe(container.clientWidth / 2);
  });
});
