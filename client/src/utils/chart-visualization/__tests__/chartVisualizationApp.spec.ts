/* eslint-disable max-len */
import * as PIXI from 'pixi.js';
import { ChartObjectInterface, NoteDescription } from 'utils/chart-parser';
import ChartVisualizationApp, {
  CallbackOnEnd,
  CallbackOnUpdate,
} from '../chartVisualizationApp';
import * as testData from './mockData/chartObjects';

type CreateAnimationFactoryMethodSignature = (
  parent: HTMLElement,
  loadedSprites: { [key: string]: PIXI.Sprite },
  chartObject: ChartObjectInterface,
  audioDuration: number,
  onUpdate: CallbackOnUpdate,
  onEnd: CallbackOnEnd,
) => ChartVisualizationApp;

type CreateOverviewFactoryMethodSignature = (
  parent: HTMLElement,
  loadedSprites: { [key: string]: PIXI.Sprite },
  chartObject: ChartObjectInterface,
  audioDuration: number,
) => ChartVisualizationApp;

afterEach(() => {
  jest.useRealTimers();
});

describe('chartVisualizationApp test suite', () => {
  jest.spyOn(global, 'setTimeout');
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(
      (callback) => setTimeout(
          () => callback(performance.now()),
          PIXI.Ticker.system.deltaMS,
      ) as unknown as number,
  );

  const mockOnUpdateCallback = jest.fn();
  const mockOnEndCallback = jest.fn();
  const createChartVisualizationApp = (
      factoryMethod: CreateAnimationFactoryMethodSignature | CreateOverviewFactoryMethodSignature,
      parent: HTMLElement,
      chartObject?: ChartObjectInterface,
      audioDuration?: number,
  ) => {
    const defaultLoadedSprites = {
      [NoteDescription[NoteDescription.GREEN]]: new PIXI.Sprite(),
      [NoteDescription[NoteDescription.RED]]: new PIXI.Sprite(),
      [NoteDescription[NoteDescription.BLUE]]: new PIXI.Sprite(),
      [NoteDescription[NoteDescription.YELLOW]]: new PIXI.Sprite(),
      [NoteDescription[NoteDescription.ORANGE]]: new PIXI.Sprite(),
    };
    const defaultChartObject = testData.defaultChartObject;

    return factoryMethod(
        parent,
        defaultLoadedSprites,
        chartObject || defaultChartObject,
        audioDuration || 4 * 60 / 110 * 1000,
        mockOnUpdateCallback,
        mockOnEndCallback,
    );
  };

  test('should append a canvas element to the parent element when calling createAnimationFactory', () => {
    createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
    );

    expect(document.body.querySelector('canvas')).toBeInTheDocument();
  });

  test('should append a canvas element to the parent element when calling createOverviewFactory', () => {
    createChartVisualizationApp(
        ChartVisualizationApp.createOverviewFactory,
        document.body,
    );

    expect(document.body.querySelector('canvas')).toBeInTheDocument();
  });

  test('should start/pause PIXI\'s ticker when calling toggleAnimation', () => {
    const animationApp = createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
    );
    const tickerStartSpy = jest.spyOn((animationApp as any).app.ticker, 'start');
    const tickerStopSpy = jest.spyOn((animationApp as any).app.ticker, 'stop');

    animationApp.toggleAnimation();
    expect(tickerStartSpy).toHaveBeenCalledTimes(1);

    animationApp.toggleAnimation();
    expect(tickerStopSpy).toHaveBeenCalledTimes(1);

    animationApp.toggleAnimation();
    expect(tickerStartSpy).toHaveBeenCalledTimes(2);
  });

  test.each(
      Object.entries(testData),
  )('should move notes on the screen when animating (testing with %s)', (_testName, chartObject) => {
    jest.useFakeTimers();

    const animationApp = createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
        chartObject,
    );
    const previousX = (animationApp as any).notesContainer.x;

    animationApp.toggleAnimation();
    jest.runOnlyPendingTimers();

    const currentX = (animationApp as any).notesContainer.x;
    expect(currentX).toBeLessThan(previousX);
  });

  test.each(
      Object.entries(testData),
  )('should play the animation for %s from beginning to end without errors', (_testName, chartObject) => {
    jest.useFakeTimers();

    try {
      const durationMs = 5 * 60 * 1000;
      const animationApp = createChartVisualizationApp(
          ChartVisualizationApp.createAnimationFactory,
          document.body,
          chartObject,
          durationMs,
      );

      animationApp.toggleAnimation();
      jest.advanceTimersByTime(durationMs);
    } catch (error) {
      expect(error).not.toBeDefined();
    }
  });

  test('should call callbackOnUpdate on each frame when animating', () => {
    jest.useFakeTimers();

    const animationApp = createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
    );

    expect(mockOnUpdateCallback).not.toHaveBeenCalled();
    animationApp.toggleAnimation();
    expect(mockOnUpdateCallback).not.toHaveBeenCalled();

    for (let i = 1; i <= 5; i++) {
      jest.runOnlyPendingTimers();
      expect(mockOnUpdateCallback).toHaveBeenCalledTimes(i);
    }
  });

  test('should call callbackOnEnd when animation plays to the end of the song', () => {
    jest.useFakeTimers();

    const durationMs = 4 * 60 / 110 * 1000;
    const animationApp = createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
        undefined,
        durationMs,
    );

    expect(mockOnEndCallback).not.toHaveBeenCalled();
    animationApp.toggleAnimation();

    jest.advanceTimersByTime(durationMs / 2);
    expect(mockOnEndCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(durationMs / 2);
    expect(mockOnEndCallback).toHaveBeenCalledTimes(1);
  });

  test('should rewind to the beginning when animation plays to the end of the song', () => {
    jest.useFakeTimers();

    const durationMs = 4 * 60 / 110 * 1000;
    const animationApp = createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
        undefined,
        durationMs,
    );
    const initialX = (animationApp as any).notesContainer.x;

    animationApp.toggleAnimation();
    jest.advanceTimersByTime(durationMs);
    expect((animationApp as any).notesContainer.x).toEqual(initialX);
  });

  test('should automatically stop when animation plays to the end of the song', () => {
    jest.useFakeTimers();

    const durationMs = 4 * 60 / 110 * 1000;
    const animationApp = createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
        undefined,
        durationMs,
    );
    const initialX = (animationApp as any).notesContainer.x;

    animationApp.toggleAnimation();
    jest.advanceTimersByTime(durationMs);
    jest.runOnlyPendingTimers();
    jest.advanceTimersByTime(durationMs / 2);
    expect((animationApp as any).notesContainer.x).toEqual(initialX);
  });

  test('createOverviewFactory should not have any animation', () => {
    jest.useFakeTimers();

    const overviewApp = createChartVisualizationApp(
        ChartVisualizationApp.createOverviewFactory,
        document.body,
    );
    const previousX = (overviewApp as any).notesContainer.x;

    overviewApp.toggleAnimation();
    jest.runOnlyPendingTimers();

    const currentX = (overviewApp as any).notesContainer.x;
    expect(previousX).toEqual(currentX);
  });

  test('should destroy PIXI application when calling destroy', () => {
    const animationApp = createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
    );
    let destroySpy = jest.spyOn((animationApp as any).app, 'destroy');

    animationApp.destroy();
    expect(destroySpy).toHaveBeenCalledTimes(1);

    const overviewApp = createChartVisualizationApp(
        ChartVisualizationApp.createOverviewFactory,
        document.body,
    );
    destroySpy = jest.spyOn((overviewApp as any).app, 'destroy');

    overviewApp.destroy();
    expect(destroySpy).toHaveBeenCalledTimes(1);
  });

  test('should resize properly withour errors when calling resize', () => {
    try {
      const animationApp = createChartVisualizationApp(
          ChartVisualizationApp.createAnimationFactory,
          document.body,
      );
      animationApp.resize(document.body);
    } catch (error) {
      expect(error).not.toBeDefined();
    }

    try {
      const overviewApp = createChartVisualizationApp(
          ChartVisualizationApp.createOverviewFactory,
          document.body,
      );
      overviewApp.resize(document.body);
    } catch (error) {
      expect(error).not.toBeDefined();
    }
  });

  test('setPixelsPerTick and getPixelsPerTick should work properly', () => {
    try {
      const animationApp = createChartVisualizationApp(
          ChartVisualizationApp.createAnimationFactory,
          document.body,
      );
      const pixelsPerTick = 0.5;

      animationApp.pixelsPerTick = pixelsPerTick;
      expect(animationApp.pixelsPerTick).toBe(pixelsPerTick);
    } catch (error) {
      expect(error).not.toBeDefined();
    }
  });

  test('seekInTime and progressInTime should work properly', () => {
    jest.useFakeTimers();

    const animationApp = createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
        testData.chartObject2,
        5 * 60 * 1000,
    );
    const initialX = (animationApp as any).notesContainer.x;

    animationApp.toggleAnimation();
    expect(animationApp.progressInTime).toBe(0);
    jest.runOnlyPendingTimers();
    expect(animationApp.progressInTime).toBeGreaterThan(0);
    animationApp.toggleAnimation();

    let previousProgress = animationApp.progressInTime;
    let previousX = (animationApp as any).notesContainer.x;
    animationApp.seekInTime(0.3);
    expect(animationApp.progressInTime).toBeGreaterThan(previousProgress);
    expect((animationApp as any).notesContainer.x).toBeLessThan(previousX);

    previousProgress = animationApp.progressInTime;
    previousX = (animationApp as any).notesContainer.x;
    animationApp.seekInTime(0.8);
    expect(animationApp.progressInTime).toBeGreaterThan(previousProgress);
    expect((animationApp as any).notesContainer.x).toBeLessThan(previousX);

    animationApp.seekInTime(0);
    expect(animationApp.progressInTime).toBeCloseTo(0);
    expect(animationApp.progressInTicks).toBeCloseTo(0);
    expect((animationApp as any).notesContainer.x).toBeCloseTo(initialX, 0.02);
  });

  test('seekInTicks and progressInTicks should work properly', () => {
    jest.useFakeTimers();

    const animationApp = createChartVisualizationApp(
        ChartVisualizationApp.createAnimationFactory,
        document.body,
        testData.chartObject2,
        5 * 60 * 1000,
    );
    const initialX = (animationApp as any).notesContainer.x;

    animationApp.toggleAnimation();
    expect(animationApp.progressInTicks).toBe(0);
    jest.runOnlyPendingTimers();
    expect(animationApp.progressInTicks).toBeGreaterThan(0);
    animationApp.toggleAnimation();

    let previousProgress = animationApp.progressInTicks;
    let previousX = (animationApp as any).notesContainer.x;
    animationApp.seekInTicks(0.3);
    expect(animationApp.progressInTicks).toBeGreaterThan(previousProgress);
    expect((animationApp as any).notesContainer.x).toBeLessThan(previousX);

    previousProgress = animationApp.progressInTicks;
    previousX = (animationApp as any).notesContainer.x;
    animationApp.seekInTicks(0.8);
    expect(animationApp.progressInTicks).toBeGreaterThan(previousProgress);
    expect((animationApp as any).notesContainer.x).toBeLessThan(previousX);

    animationApp.seekInTicks(0);
    expect(animationApp.progressInTime).toBeCloseTo(0);
    expect(animationApp.progressInTicks).toBeCloseTo(0);
    expect((animationApp as any).notesContainer.x).toBeCloseTo(initialX, 0.02);
  });
});
