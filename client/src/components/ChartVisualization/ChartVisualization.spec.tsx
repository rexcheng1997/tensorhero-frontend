/* eslint-disable max-len */
import React from 'react';
import ChartVisualization, {
  ChartVisualizationProps,
  animationApp, overviewApp, audio,
} from '.';
import ChartVisualizationApp from 'utils/chart-visualization';
import { formatTimestamp } from 'utils/formatting';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  mockGetBoundingClientRect,
  mockHTMLElementProperties,
  mockWindowMethods,
} from '__mocks__/domiscMock';

jest.mock('howler');
jest.mock('utils/chart-visualization/chartVisualizationApp', () => ({
  pixelsPerTick: 1,
  progressInTime: 0.5,
  progressInTicks: 0.6,
  createAnimationFactory: jest.fn().mockReturnThis(),
  createOverviewFactory: jest.fn().mockReturnThis(),
  toggleAnimation: jest.fn(),
  seekInTime: jest.fn(),
  seekInTicks: jest.fn(),
  resize: jest.fn(),
  destroy: jest.fn(),
}));
jest.mock('utils/chart-visualization/noteSpriteLoader', () => jest.fn().mockReturnValue({
  onComplete: {
    add: (callback: () => void) => setTimeout(callback),
  },
  onError: {
    add: () => {},
  },
  destroy: () => {},
}));

beforeAll(() => {
  mockHTMLElementProperties({ clientWidth: 860, clientHeight: 320 });
  mockGetBoundingClientRect();
  mockWindowMethods();
});

afterEach(() => {
  (animationApp as any) = undefined;
  (overviewApp as any) = undefined;
  (audio as any) = undefined;
  jest.clearAllMocks();
});

describe('<ChartVisualization />', () => {
  const mockCallbackOnLoaded = jest.fn();
  const renderChartVisualization = (props: Partial<ChartVisualizationProps> = {}) => {
    const defaultProps: ChartVisualizationProps = {
      chartObject: {
        Song: {
          Name: 'Ouray',
          Artist: 'Andy McKee',
          Offset: '0',
          Resolution: '192',
          Difficulty: 'expert',
          Player2: 'bass',
          PreviewStart: '0',
          PreviewEnd: '0',
          MediaType: 'cd',
          MusicStream: 'song.ogg',
        },
        SyncTrack: {
          TimeSignatureChanges: [],
          BPMChanges: [],
        },
        Events: [],
        ExpertSingle: [],
      },
      audioUrl: 'song.ogg',
      callbackOnLoaded: mockCallbackOnLoaded,
    };

    return render(<ChartVisualization {...defaultProps} {...props} />);
  };
  const waitForOnMountedHooks = () => waitFor(() => {
    expect(animationApp).toBeDefined();
    expect(overviewApp).toBeDefined();
    expect(audio).toBeDefined();
  });

  test('should load chart and song properly onMounted', async () => {
    renderChartVisualization();
    await waitForOnMountedHooks();

    expect(ChartVisualizationApp.createAnimationFactory).toHaveBeenCalledTimes(1);
    expect(ChartVisualizationApp.createOverviewFactory).toHaveBeenCalledTimes(1);
  });

  test('should call callbackOnLoaded once the component finishes its onMounted hooks', async () => {
    renderChartVisualization();
    await waitForOnMountedHooks();

    expect(mockCallbackOnLoaded).toHaveBeenCalled();
  });

  test('audio should not autoplay after the component is rendered', async () => {
    renderChartVisualization();
    await waitForOnMountedHooks();

    expect(audio.playing()).toBe(false);
  });

  test('should resize properly', async () => {
    const { findByTestId } = renderChartVisualization();
    const container = await findByTestId('chart-viz-wrapper');
    const animationContainer = container.querySelector('.main-screen-wrapper') as HTMLDivElement;
    const overviewContainer = container.querySelector('.overview-wrapper') as HTMLDivElement;
    await waitForOnMountedHooks();

    fireEvent.resize(window);
    expect(animationApp.resize).toHaveBeenCalledWith(animationContainer);
    expect(overviewApp.resize).toHaveBeenCalledWith(overviewContainer);
  });

  test('should enter/exit full screen mode when clicking on the full screen icon', async () => {
    const windowScrollToSpy = jest.spyOn(window, 'scrollTo');

    const { findByTestId } = renderChartVisualization();
    const container = await findByTestId('chart-viz-wrapper');
    const fullscreenIcon = await findByTestId('full-screen-icon');
    await waitForOnMountedHooks();

    expect(container).not.toHaveClass('full-screen');
    expect(windowScrollToSpy).not.toHaveBeenCalled();

    fireEvent.click(fullscreenIcon);
    expect(container).toHaveClass('full-screen');
    expect(windowScrollToSpy).not.toHaveBeenCalled();

    fireEvent.click(fullscreenIcon);
    expect(container).not.toHaveClass('full-screen');
    expect(windowScrollToSpy).toHaveBeenCalledTimes(1);
  });

  test('should play/pause the animation and the audio on clicking the main screen', async () => {
    const { findByTestId } = renderChartVisualization();
    const container = await findByTestId('chart-viz-wrapper');
    const animationContainer = container.querySelector('.main-screen-wrapper')!;
    expect(animationContainer).toBeDefined();

    await waitForOnMountedHooks();

    fireEvent.click(animationContainer);
    expect(animationApp.toggleAnimation).toHaveBeenCalledTimes(1);
    expect(audio.playing()).toBe(true);

    fireEvent.click(animationContainer);
    expect(animationApp.toggleAnimation).toHaveBeenCalledTimes(2);
    expect(audio.playing()).toBe(false);
  });

  test('should play/puase the animation and the audio on clicking the play/pause icon', async () => {
    const { findByTestId } = renderChartVisualization();
    const playPauseIcon = await findByTestId('player-play-pause-icon');
    expect(playPauseIcon).toBeDefined();

    await waitForOnMountedHooks();

    fireEvent.click(playPauseIcon);
    expect(animationApp.toggleAnimation).toHaveBeenCalledTimes(1);
    expect(audio.playing()).toBe(true);

    fireEvent.click(playPauseIcon);
    expect(animationApp.toggleAnimation).toHaveBeenCalledTimes(2);
    expect(audio.playing()).toBe(false);
  });

  test('should fast forward or rewind when clicking the progress bar', async () => {
    const { findByTestId } = renderChartVisualization();
    const container = await findByTestId('chart-viz-wrapper');
    const animationContainer = container.querySelector('.main-screen-wrapper') as HTMLDivElement;
    const timestamp = container.querySelector('.timestamp') as HTMLSpanElement;
    const progressBar = await findByTestId('progress-bar-wrapper');
    expect(progressBar).toBeDefined();
    const progressBarItself = progressBar.querySelector('.progress-bar') as HTMLDivElement;

    await waitForOnMountedHooks();

    const executeClickEventTest = (dx: number) => {
      const ratio = dx / animationContainer.clientWidth;
      fireEvent.click(progressBar, {
        clientX: dx + animationContainer.getBoundingClientRect().x,
      });
      expect(progressBarItself.clientWidth).toBe(dx);
      expect(animationApp.seekInTime).toHaveBeenCalledWith(ratio);
      expect(audio.seek()).toBe(ratio * audio.duration());
      expect(timestamp.innerText).toBe(
          `${formatTimestamp(ratio * audio.duration())} / ${formatTimestamp(audio.duration())}`,
      );
    };

    executeClickEventTest(200);
    executeClickEventTest(50);
  });

  test('should fast forward or rewind when dragging the progress bar handle', async () => {
    const { findByTestId } = renderChartVisualization();
    const container = await findByTestId('chart-viz-wrapper');
    const animationContainer = container.querySelector('.main-screen-wrapper') as HTMLDivElement;
    const timestamp = container.querySelector('.timestamp') as HTMLSpanElement;
    const progressBar = await findByTestId('progress-bar-wrapper');
    expect(progressBar).toBeDefined();
    const progressBarItself = progressBar.querySelector('.progress-bar') as HTMLDivElement;
    const progressBarHandle = await findByTestId('progress-bar-handle');
    expect(progressBarHandle).toBeDefined();

    const user = userEvent.setup();

    const executePointerEventTest = async (name: string, displacements: number[]) => {
      await user.pointer({ keys: `[${name}>]`, target: progressBarHandle });
      expect(audio.playing()).toBe(false);

      for (const dx of displacements) {
        await user.pointer({
          pointerName: name,
          target: progressBarHandle,
          coords: { clientX: dx + animationContainer.getBoundingClientRect().x },
        });

        const ratio = dx / animationContainer.clientWidth;
        expect(progressBarItself.clientWidth).toBe(dx);
        expect(animationApp.seekInTime).toHaveBeenCalledWith(ratio);
        expect(audio.seek()).toBe(ratio * audio.duration());
        expect(timestamp.innerText).toBe(
            `${formatTimestamp(ratio * audio.duration())} / ${formatTimestamp(audio.duration())}`,
        );
      }

      await user.pointer({ keys: `[/${name}]` });
      expect(audio.playing()).toBe(true);

      return Promise.resolve();
    };

    await executePointerEventTest('TouchA', [5, 10, 15, 20]);
    await executePointerEventTest('TouchB', [30, 40, 50, 45, 35, 10, 1, 6]);
  });

  // waiting for enhancement of @testing-library/user-event to support movementX for pointermove event
  test.skip('should fast forward or rewind when dragging the navigation window on the overview', async () => {
    const { findByTestId } = renderChartVisualization();
    const container = await findByTestId('chart-viz-wrapper');
    const animationContainer = container.querySelector('.main-screen-wrapper') as HTMLDivElement;
    const overviewContainer = container.querySelector('.overview-wrapper') as HTMLDivElement;
    const timestamp = container.querySelector('.timestamp') as HTMLSpanElement;
    const progressBar = await findByTestId('progress-bar-wrapper');
    expect(progressBar).toBeDefined();
    const progressBarItself = progressBar.querySelector('.progress-bar') as HTMLDivElement;
    const navigationWindow = await findByTestId('overview-navigation-window');
    expect(navigationWindow).toBeDefined();

    const user = userEvent.setup();

    const executePointerEventTest = async (name: string, displacements: number[]) => {
      await user.pointer({ keys: `[${name}>]`, target: navigationWindow });
      expect(audio.playing()).toBe(false);

      for (const dx of displacements) {
        await user.pointer({
          pointerName: name,
          target: navigationWindow,
          // coords: { movementX: dx },
        });

        const ratio = dx / overviewContainer.clientWidth;
        expect(animationApp.seekInTicks).toHaveBeenCalledWith(ratio);
        expect(progressBarItself.clientWidth).toBe(animationApp.progressInTime * animationContainer.clientWidth);
        expect(audio.seek()).toBe(animationApp.progressInTime * audio.duration());
        expect(timestamp.innerText).toBe(
            `${formatTimestamp(animationApp.progressInTime * audio.duration())} / ${formatTimestamp(audio.duration())}`,
        );
      }

      await user.pointer({ keys: `[/${name}]` });
      expect(audio.playing()).toBe(true);

      return Promise.resolve();
    };

    await executePointerEventTest('TouchA', [5, 10, 15, 20, 30]);
    await executePointerEventTest('TouchB', [20, 30, 25, 15, 5, 10]);
  });

  test('should zoom in/out when dragging the navigation window handle on the overview', async () => {
    const { findByTestId } = renderChartVisualization();
    const container = await findByTestId('chart-viz-wrapper');
    const animationContainer = container.querySelector('.main-screen-wrapper') as HTMLDivElement;
    const navigationWindow = await findByTestId('overview-navigation-window');
    expect(navigationWindow).toBeDefined();
    const navigationWindowHandle = await findByTestId('overview-navigation-window-handle');
    expect(navigationWindowHandle).toBeDefined();

    const user = userEvent.setup();

    const executePointerEventTest = async (name: string, displacements: number[]) => {
      await user.pointer({ keys: `[${name}>]`, target: navigationWindowHandle });
      expect(audio.playing()).toBe(false);

      for (const dx of displacements) {
        const pixelsPerTick = overviewApp.pixelsPerTick;
        await user.pointer({
          pointerName: name,
          target: navigationWindowHandle,
          coords: { clientX: dx + navigationWindow.getBoundingClientRect().x },
        });

        expect(navigationWindow.clientWidth).toBeCloseTo(dx, 3);
        expect(animationApp.pixelsPerTick).toBe(
            animationContainer.clientWidth / dx * pixelsPerTick,
        );
        expect(animationApp.seekInTicks).not.toHaveBeenCalled();
        expect(animationApp.seekInTime).not.toHaveBeenCalled();
      }

      await user.pointer({ keys: `[/${name}]` });
      expect(audio.playing()).toBe(false);

      return Promise.resolve();
    };

    await executePointerEventTest('TouchA', [50, 100, 150]);
    await executePointerEventTest('TouchB', [200, 250, 150, 100, 300]);
  });
});
