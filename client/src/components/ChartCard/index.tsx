import React, { useRef } from 'react';
import _ from 'lodash';
import { formatTimestamp } from 'utils/chart-visualization';
import { formatBigNumber } from 'utils/formatting';
import DurationIcon from 'assets/svg/duration.svg';
import DifficultyLevelIcon from 'assets/svg/difficulty-level.svg';
import SpeedIcon from 'assets/svg/speed.svg';
import FullComboIcon from 'assets/svg/full-combo.svg';
import PlayIcon from 'assets/svg/play.svg';
import FavoriteIcon from 'assets/svg/favorite.svg';
import TwitchIcon from 'assets/svg/twitch.svg';
import ShareIcon from 'assets/svg/share.svg';
import DownloadIcon from 'assets/svg/download.svg';

export type ChartDataObject = {
  id: number,
  title: string,
  artist: string,
  charter: string,
  genre: string,
  cover: string,
  audio: string,
  chart: {
    easy?: string,
    medium?: string,
    hard?: string,
    expert?: string,
  },
  createdAt: string,
  duration: number,
  likes: number,
  plays: number,
  downloads: number,
  shares: number,
  fullCombo: boolean,
};

type ChartCardProps = {
  data: ChartDataObject,
  showDetails: boolean,
  onClick?: (chart: ChartDataObject) => void,
};

/**
 * ChartCard React component
 * used on the "charts" page
 * @param {ChartCardProps} props
 * @return {JSX.Element}
 */
export default function ChartCard({
  data, showDetails, onClick: clickEventHandler,
}: ChartCardProps): JSX.Element {
  const favoriteIconParentRef = useRef<HTMLDivElement>(null);

  const favoriteClickEventHandler = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    event.currentTarget.classList.toggle('active');
    // eslint-disable-next-line max-len
    favoriteIconParentRef.current?.querySelector('svg')?.classList.toggle('active');
  };

  return (
    <div className={'chart-card' + (showDetails ? '' : ' fill')}>
      <div className='chart-card-inner flex-row nowrap'
        style={{ cursor: clickEventHandler ? 'pointer' : 'default' }}
        onClick={() => clickEventHandler && clickEventHandler(data)}>

        <div className={'cover' + (showDetails ? '' : ' fill')} style={{
          backgroundImage: `url("${data.cover}")`,
        }}/>

        <div className='left flex-col'>
          <h2 className='title' title={data.title}>
            {data.title}
          </h2>
          <h2 className='artist' title={data.artist}>
            {data.artist}
          </h2>

          <div className='metadata flex-row align-center'>
            <span className='charter'>
              by <strong>{data.charter}</strong>
            </span>
            <span className='date'>
              {new Date(data.createdAt).toDateString()}
            </span>
          </div>

          <div className='stats flex-row align-center'>
            <div className='likes flex-row align-center'
              ref={favoriteIconParentRef}>
              <FavoriteIcon width='20' height='20' viewBox='0 0 24 24'/>
              <span>{formatBigNumber(data.likes)}</span>
            </div>
            <div className='plays flex-row align-center'>
              <PlayIcon width='28' height='28' viewBox='0 0 24 24'/>
              <span>{formatBigNumber(data.plays)}</span>
            </div>
            <div className='downloads flex-row align-center'>
              <DownloadIcon width='20' height='18' viewBox='0 0 24 22'/>
              <span>{formatBigNumber(data.downloads)}</span>
            </div>
            <div className='shares flex-row align-center'>
              <ShareIcon/>
              <span>{formatBigNumber(data.shares)}</span>
            </div>
          </div>

          {showDetails && <div className='tags flex-col align-end'>
            {data.genre && <span className='tag'>{data.genre}</span>}
          </div>}

        </div>

        {showDetails && <div className='right flex-col space-between'>
          <div className='duration flex-row align-center'>
            <DurationIcon/>
            <span>{formatTimestamp(data.duration)}</span>
          </div>
          <div className='difficulty-level flex-row align-center'>
            <DifficultyLevelIcon/>
            <div className='flex-row align-center'>
              {_.has(data, 'chart.easy') && <span className='level easy'/>}
              {_.has(data, 'chart.medium') && <span className='level medium'/>}
              {_.has(data, 'chart.hard') && <span className='level hard'/>}
              {_.has(data, 'chart.expert') && <span className='level expert'/>}
            </div>
          </div>
          <div className='speed flex-row align-center'>
            <SpeedIcon/>
          </div>
          <div className='full-combo flex-row align-center'>
            <FullComboIcon/>
            <span>{data.fullCombo && 'FC'}</span>
          </div>
        </div>}

      </div>

      <div className='chart-card-actions flex-col align-center space-between'>
        <FavoriteIcon onClick={favoriteClickEventHandler}/>
        <TwitchIcon/>
        <ShareIcon/>
        <DownloadIcon width='20' height='18' viewBox='0 0 24 22'/>
      </div>

    </div>
  );
};
