import './style.scss';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Loader } from 'pixi.js';
import { Howl } from 'howler';
import { CreateEventHandlerFactory } from 'components/types';
import AspectRatioContainer from 'components/AspectRatioContainer';
import VolumeControl from 'components/VolumeControl';
import { ChartObjectInterface } from 'utils/chart-parser';
import ChartVisualizationApp, {
  clipBetween,
  createNoteSpriteLoader,
} from 'utils/chart-visualization';
import { formatTimestamp } from 'utils/formatting';
import { DEFAULT_PIXELS_PER_TICK } from 'utils/chart-visualization/constants';

import PlayIcon from 'assets/svg/play.svg';
import PauseIcon from 'assets/svg/pause.svg';
import FullscreenIcon from 'assets/svg/fullscreen.svg';
import FullscreenExitIcon from 'assets/svg/fullscreen.exit.svg';

const sprites = {};
const INITIAL_VOLUME = 0.8;
const MIN_BLOCK_CONTROL_PERCENTAGE = 0.005;
let loader: Loader;
let animationApp: ChartVisualizationApp;
let overviewApp: ChartVisualizationApp;
let audio: Howl;

export type ChartVisualizationProps = {
  chartObject: ChartObjectInterface,
  audioUrl: string,
  callbackOnLoaded?: () => void,
};

/**
 * React component for chart visualization
 * including main animation screen and small overview for navigation
 * @param {ChartVisualizationProps} props
 * @return {JSX.Element}
 */
export default function ChartVisualization({
  chartObject, audioUrl, callbackOnLoaded,
}: ChartVisualizationProps): JSX.Element {
  const loaded = useRef<boolean>(false);
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const overviewContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timestampRef = useRef<HTMLSpanElement>(null);
  const blockControlRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [
    progressControlPressed, setProgressControlPressed,
  ] = useState<boolean>(false);
  const [
    pixelsPerTick, setPixelsPerTick,
  ] = useState<number>(DEFAULT_PIXELS_PER_TICK);
  const [
    blockControlPressed, setBlockControlPressed,
  ] = useState<boolean>(false);
  const [
    blockControlHandlePressed, setBlockControlHandlePressed,
  ] = useState<boolean>(false);


  const animationUpdateEventHandler = () => {
    updateTimestamp();

    let screenWidth = animationContainerRef.current?.clientWidth || 0;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${
        animationApp.progressInTime * screenWidth
      }px`;
    }

    screenWidth = overviewContainerRef.current?.clientWidth || 0;
    const offsetLeft = clipBetween(
        animationApp.progressInTicks * screenWidth,
        0, screenWidth - (blockControlRef.current?.clientWidth || 0),
    );
    if (blockControlRef.current) {
      blockControlRef.current.style.left = `${offsetLeft}px`;
    }
  };

  const animationEndedEventHandler = () => {
    audio.stop();
    setPlaying(false);
  };

  const playPauseEventHandler = (event: React.MouseEvent | null) => {
    event?.stopPropagation();
    animationApp.toggleAnimation();
    audio.playing() ? audio.pause() : audio.play();
    setPlaying(!playing);
  };

  const setVolume = (value: number) => audio && audio.volume(value);

  const createPressProgressBarControlEventHandler: CreateEventHandlerFactory<
    boolean, React.PointerEvent<HTMLDivElement>
  > = (value) => (event) => {
    event.stopPropagation();
    setProgressControlPressed(value);
  };

  const progressBarClickOrDragEventHandler = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (event.type === 'pointermove' && !progressControlPressed) return;

    let screenWidth = animationContainerRef.current!.clientWidth;
    const relativeX = (
      event.clientX - animationContainerRef.current!.getBoundingClientRect().x);
    progressBarRef.current!.style.width = `${relativeX}px`;

    const progress = clipBetween(relativeX / screenWidth, 0, 1);
    animationApp.seekInTime(progress);
    screenWidth = overviewContainerRef.current!.clientWidth;
    blockControlRef.current!.style.left = `${clipBetween(
        animationApp.progressInTicks * screenWidth,
        0, screenWidth - blockControlRef.current!.clientWidth,
    )}px`;
    audio.seek(progress * audio.duration());
    updateTimestamp();
  };

  const fullscreenEventHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFullscreen(!fullscreen);
    rootContainerRef.current!.classList.toggle('full-screen');
    animationApp.resize(animationContainerRef.current!);
    overviewApp.resize(overviewContainerRef.current!);
  };

  const updateTimestamp = () => {
    const currentTimetamp = formatTimestamp(audio.seek());
    const durationTimestamp = formatTimestamp(audio.duration());

    if (timestampRef.current) {
      timestampRef.current.innerText =
        currentTimetamp + ' / ' + durationTimestamp;
    }
  };

  const createPressBlockControlEventHandler: CreateEventHandlerFactory<
    boolean, React.PointerEvent<HTMLDivElement>
  > = (value) => (event) => {
    event.stopPropagation();
    setBlockControlPressed(value);
  };

  const createPressBlockControlHandleEventHandler: CreateEventHandlerFactory<
    boolean, React.PointerEvent<HTMLDivElement>
  > = (value) => (event) => {
    event.stopPropagation();
    setBlockControlHandlePressed(value);
  };

  const createPressBlockControlCombinedEventHandler: CreateEventHandlerFactory<
    boolean, React.PointerEvent<HTMLDivElement>
  > = (value) => (event) => {
    event.stopPropagation();
    setBlockControlPressed(value);
    setBlockControlHandlePressed(value);
  };

  const blockControlOrHandleDragEventHandler = (event: React.PointerEvent) => {
    event.stopPropagation();

    if (blockControlPressed) { // drags the entire control block
      const animationWidth = animationContainerRef.current!.clientWidth;
      const overviewWidth = overviewContainerRef.current!.clientWidth;
      const blockControlWidth = blockControlRef.current!.clientWidth;
      const targetOffsetLeft = clipBetween(
        blockControlRef.current!.offsetLeft + event.movementX,
        0, overviewWidth - blockControlWidth,
      );

      blockControlRef.current!.style.left = `${targetOffsetLeft}px`;
      animationApp.seekInTicks(targetOffsetLeft / overviewWidth);
      progressBarRef.current!.style.width = `${
        animationApp.progressInTime * animationWidth
      }px`;
      audio.seek(animationApp.progressInTime * audio.duration());
      updateTimestamp();
    } else if (blockControlHandlePressed) { // drags the block handle
      const animationWidth = animationContainerRef.current!.clientWidth;
      const overviewWidth = overviewContainerRef.current!.clientWidth;
      const targetWidth = clipBetween(
          event.clientX - blockControlRef.current!.getBoundingClientRect().x,
          MIN_BLOCK_CONTROL_PERCENTAGE * overviewWidth,
          overviewWidth,
      );

      setPixelsPerTick(
          animationWidth / targetWidth * overviewApp.pixelsPerTick,
      );
    }
  };

  const computeBlockControlWidth = () => {
    const animationWidth = animationContainerRef.current?.clientWidth || 0;
    const overviewWidth = overviewContainerRef.current?.clientWidth || 0;
    const offsetLeft = blockControlRef.current?.offsetLeft || 0;
    const blockControlWidth = clipBetween(
        animationWidth / pixelsPerTick * overviewApp.pixelsPerTick,
        0, overviewWidth - offsetLeft,
    );

    if (blockControlRef.current) {
      blockControlRef.current.style.width = `${blockControlWidth}px`;
    }
  };

  useEffect(() => {
    loader = createNoteSpriteLoader(sprites);
    audio = new Howl({
      src: [audioUrl],
      autoplay: false,
      volume: INITIAL_VOLUME,
    });

    Promise.all([
      // wait for all sprites to be loaded
      new Promise<void>((resolve, reject) => {
        loader.onComplete.add(() => resolve());
        loader.onError.add((error) => reject(error));
      }),
      // wait for audio to be loaded
      new Promise<void>((resolve, reject) => {
        audio.once('load', () => resolve());
        audio.once('loaderror', (_soundId, error) => reject(error));
      }),
    ]).then(() => {
      animationApp = ChartVisualizationApp.createAnimationFactory(
          animationContainerRef.current!,
          sprites,
          chartObject,
          audio.duration() * 1e3,
          animationUpdateEventHandler,
          animationEndedEventHandler,
      );
      overviewApp = ChartVisualizationApp.createOverviewFactory(
          overviewContainerRef.current!,
          sprites,
          chartObject,
          audio.duration() * 1e3,
      );
      return Promise.resolve();
    }).then(() => {
      loaded.current = true;
      updateTimestamp();
      computeBlockControlWidth();
      callbackOnLoaded && callbackOnLoaded();
    }).catch((error) => console.error(error));

    const resizeEventHandler = () => {
      animationApp && animationApp.resize(animationContainerRef.current!);
      overviewApp && overviewApp.resize(overviewContainerRef.current!);

      if (blockControlRef.current) {
        const screenWidth = overviewContainerRef.current!.clientWidth;
        const offsetLeft = clipBetween(
            animationApp.progressInTicks * screenWidth,
            0, screenWidth * (1 - MIN_BLOCK_CONTROL_PERCENTAGE),
        );

        blockControlRef.current.style.height = overviewContainerRef.current ?
          `${overviewContainerRef.current.clientHeight}px` : '100%';
        blockControlRef.current.style.left = `${offsetLeft}px`;

        computeBlockControlWidth();
      }
    };

    window.addEventListener('resize', resizeEventHandler);

    return () => {
      animationApp?.destroy();
      overviewApp?.destroy();
      audio?.unload();
      loader.destroy();
      window.removeEventListener('resize', resizeEventHandler);
    };
  }, []);

  useEffect(() => {
    const needsToToggleAnimation = loaded.current && (
      ((progressControlPressed || blockControlPressed) &&
        playing) || // stops animation when pressed
      ((!progressControlPressed && !blockControlPressed) &&
        !playing) // resumes animation when released
    );

    if (needsToToggleAnimation) {
      playPauseEventHandler(null);
    }
  }, [progressControlPressed, blockControlPressed]);

  useEffect(() => {
    if (!loaded.current || !animationApp || !overviewApp) return;

    computeBlockControlWidth();
    animationApp.pixelsPerTick = pixelsPerTick;
  }, [pixelsPerTick]);

  return (
    <div data-testid='chart-viz-wrapper' ref={rootContainerRef}
      className='flex-col align-end justify-start visualization-wrapper'>
      <AspectRatioContainer
        ratio={3}
        className='main-screen-wrapper visualization'
        ref={animationContainerRef}
        onClick={playPauseEventHandler}
        onPointerUp={createPressProgressBarControlEventHandler(false)}
        onPointerMove={progressBarClickOrDragEventHandler}
        onPointerLeave={createPressProgressBarControlEventHandler(false)}>

        <div className='progress-container'
          onClick={(event: React.MouseEvent) => event.stopPropagation()}>
          <div className='progress flex-row align-center space-between'>
            <div data-testid='progress-bar-wrapper'
              className='progress-bar-wrapper'
              onClick={progressBarClickOrDragEventHandler}>
              <div className='progress-bar' ref={progressBarRef}>
                <div data-testid='progress-bar-handle'
                  className='progress-bar-handle'
                  onPointerDown={
                    createPressProgressBarControlEventHandler(true)
                  }/>
              </div>
            </div>

            <div className='player-control-left flex-row align-center'>
              <span data-testid='player-play-pause-icon'
                onClick={playPauseEventHandler}>
                {playing ? <PauseIcon/> : <PlayIcon/>}
              </span>
              <VolumeControl
                initialVolume={INITIAL_VOLUME}
                onVolumeChange={setVolume}/>
              <span className='timestamp' ref={timestampRef}/>
            </div>

            <div className='player-control-right flex-row align-center'>
              <span data-testid='full-screen-icon'
                onClick={fullscreenEventHandler}>
                {fullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>}
              </span>
            </div>
          </div>
        </div>

      </AspectRatioContainer>

      <AspectRatioContainer
        ratio={10}
        className='overview-wrapper visualization'
        ref={overviewContainerRef}
        onPointerUp={createPressBlockControlCombinedEventHandler(false)}
        onPointerMove={blockControlOrHandleDragEventHandler}
        onPointerLeave={createPressBlockControlCombinedEventHandler(false)}>

        <div data-testid='overview-navigation-window'
          className='block-control' ref={blockControlRef}
          onPointerDown={createPressBlockControlEventHandler(true)}>
          <div data-testid='overview-navigation-window-handle'
            className='block-control-handle'
            onPointerDown={createPressBlockControlHandleEventHandler(true)}/>
        </div>

      </AspectRatioContainer>
    </div>
  );
};

// DON'T USE! TESTING PURPOSE ONLY!
export {
  animationApp, overviewApp, audio,
};
