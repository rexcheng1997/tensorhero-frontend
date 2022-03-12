import './style.scss';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import VolumeHighIcon from 'assets/svg/volume.high.svg';
import VolumeLowIcon from 'assets/svg/volume.low.svg';
import VolumeOffIcon from 'assets/svg/volume.off.svg';
import { clipBetween } from 'utils/chart-visualization';

export type VolumeControlProps = {
  initialVolume: number;
  onVolumeChange: (volume: number) => void;
};

/**
 * React component for volume control
 * @param {VolumeControlProps} props
 * @return {JSX.Element}
 */
export default function VolumeControl({
  initialVolume, onVolumeChange,
}: VolumeControlProps): JSX.Element {
  const [width, setWidth] = useState<number>(0);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [
    volumeControlPressed, setVolumeControlPressed,
  ] = useState<boolean>(false);
  const volumeControlBarRef = useRef<HTMLDivElement>(null);

  const setVolumeBasedOnMousePosition = (event: React.MouseEvent) => {
    const relativeX = (
      event.clientX - volumeControlBarRef.current!.getBoundingClientRect().x);

    setVolume(clipBetween(
        relativeX / volumeControlBarRef.current!.clientWidth,
        0, 1,
    ));
  };

  const turnOnOffVolume = (event: React.MouseEvent) => {
    event.stopPropagation();
    setVolume(volume > 0 ? 0 : initialVolume);
  };

  const clickVolumeBarEventHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setVolumeBasedOnMousePosition(event);
  };

  const createPressVolumeControlEventHandler = (value: boolean) => (
      event: React.PointerEvent,
  ) => {
    event.stopPropagation();
    setVolumeControlPressed(value);
  };

  const volumeBarDragEventHandler = (event: React.PointerEvent) => {
    event.stopPropagation();

    if (!volumeControlPressed) return;

    setVolumeBasedOnMousePosition(event);
  };

  useEffect(() => {
    onVolumeChange(volume);
    setWidth(clipBetween(
        volume * volumeControlBarRef.current!.clientWidth,
        0, volumeControlBarRef.current!.clientWidth,
    ));
  }, [volume]);

  return (
    <div data-testid='volume-control'
      className='volume-control flex-row align-center'
      onPointerUp={createPressVolumeControlEventHandler(false)}
      onPointerMove={volumeBarDragEventHandler}
      onPointerLeave={createPressVolumeControlEventHandler(false)}>
      <span data-testid='volume-icon'
        className='volume-icon' onClick={turnOnOffVolume}>
        {volume === 0 ? <VolumeOffIcon/> : (
          volume < 0.5 ? <VolumeLowIcon/> : <VolumeHighIcon/>
        )}
      </span>
      <div data-testid='volume-control-bar'
        className='volume-control-bar' ref={volumeControlBarRef}
        onClick={clickVolumeBarEventHandler}>
        <div className='volume-control-indicator' style={{ width }}>
          <div data-testid='volume-control-handle'
            className='volume-control-handle'
            onPointerDown={createPressVolumeControlEventHandler(true)}/>
        </div>
      </div>
    </div>
  );
};
