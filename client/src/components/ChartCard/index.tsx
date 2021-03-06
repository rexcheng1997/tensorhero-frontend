import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { formatTimestamp, formatBigNumber, formatDate } from 'utils/formatting';
import Tooltip from 'components/Tooltip';
import DurationIcon from 'assets/svg/duration.svg';
import DifficultyLevelIcon from 'assets/svg/difficulty-level.svg';
import SpeedIcon from 'assets/svg/speed.svg';
import FullComboIcon from 'assets/svg/full-combo.svg';
import PlayIcon from 'assets/svg/play.svg';
import FavoriteIcon from 'assets/svg/favorite.svg';
import TwitchIcon from 'assets/svg/twitch.svg';
import ShareIcon from 'assets/svg/share.svg';
import DownloadIcon from 'assets/svg/download.svg';
import Snackbar from 'components/Snackbar';

export type ChartDataObject = {
  id: number,
  title: string,
  artist: string,
  charter: string,
  genre: string,
  album: string,
  year: string,
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
  const [message, setMessage] = useState<string>('');

  const favoriteClickEventHandler = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    event.currentTarget.classList.toggle('active');
    // eslint-disable-next-line max-len
    favoriteIconParentRef.current?.querySelector('svg')?.classList.toggle('active');
  };

  const downloadEventHandler = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    const imageExtension = data.cover.split('.').pop() || 'png';
    const audioExtension = data.audio.split('.').pop() || 'ogg';
    const files: Record<string, string> = {
      [`album.${imageExtension}`]: data.cover,
      'notes.chart': data.chart.expert!,
      [`song.${audioExtension}`]: data.audio,
    };

    setMessage('Preparing your download...');

    Promise.all<Promise<[string, Blob]>[]>(
        Object.entries(files).map(
            ([filename, url]) => fetch(url).then(
                (response) => response.blob(),
            ).then(
                (blob) => Promise.resolve([filename, blob]),
            ),
        ),
    ).then((blobFiles) => {
      const zip = new JSZip();
      const folder = zip.folder(`${data.artist} - ${data.title}`);

      if (folder === null) {
        return Promise.reject<Error>(new Error('cannot create zip folder'));
      }

      blobFiles.forEach(([filename, blob]) => {
        folder.file(filename, blob);
      });

      zip.generateAsync({ type: 'blob' }).then((content) => {
        const timestamp = new Date().getTime();
        saveAs(content, `${data.artist}-${data.title}-${timestamp}.zip`);
        setMessage('');
      });
    });
  };

  return (
    <div className={'chart-card' + (showDetails ? '' : ' fill')}>
      {message.length > 0 && <Snackbar position='bottom right'>
        <p>{message}</p>
      </Snackbar>}

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
              chart by <strong>{data.charter}</strong>
            </span>
            <span className='date'>
              {formatDate(data.createdAt)}
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
            <div className='shares flex-row align-center'>
              <ShareIcon/>
              <span>{formatBigNumber(data.shares)}</span>
            </div>
            <div className='downloads flex-row align-center'>
              <DownloadIcon width='20' height='18' viewBox='0 0 24 22'/>
              <span>{formatBigNumber(data.downloads)}</span>
            </div>
          </div>

          {showDetails && <div className='tags flex-col align-end'>
            {data.genre.length > 0 && <span className='tag'>{data.genre}</span>}
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
              {Object.keys(data.chart).map((difficulty) => (
                <span key={difficulty} className={`level ${difficulty}`}/>
              ))}
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
        <Tooltip description='Like it' position='top'>
          <FavoriteIcon onClick={favoriteClickEventHandler}/>
        </Tooltip>
        <Tooltip description='Share on Twitch' position='top'>
          <TwitchIcon/>
        </Tooltip>
        <Tooltip description='Share via link' position='top'>
          <ShareIcon/>
        </Tooltip>
        <Tooltip description='Dowload chart' position='top'>
          <DownloadIcon width='20' height='18' viewBox='0 0 24 22'
            onClick={downloadEventHandler}/>
        </Tooltip>
      </div>

    </div>
  );
};
