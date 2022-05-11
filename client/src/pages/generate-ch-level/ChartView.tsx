import React, { FC, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Howl } from 'howler';
import { MASTER_SERVER } from 'config';
import ChartVisualization from 'components/ChartVisualization';
import parseChartFile, { ChartObjectInterface } from 'utils/chart-parser';
import InputField from 'components/Form/InputField';
import Button from 'components/Button';
import Snackbar from 'components/Snackbar';
import DownloadIcon from 'assets/svg/download.svg';

export type ChartInfo = {
  title: string,
  artist: string,
  createdAt: string,
  genre: string,
  album: string,
  year: string,
  link?: string,
  charter?: string,
};

type PublishChartResponseSchema = {
  chartId: string,
};

type ChartViewProps = {
  chartInfo: ChartInfo,
  chart: string,
  audio: File,
  cover: File,
  readOnly: boolean,
};

const ChartView: FC<ChartViewProps> = ({
  chartInfo, chart, audio, cover, readOnly,
}: ChartViewProps): JSX.Element => {
  const [chartObject, setChartObject] = useState<ChartObjectInterface>();
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [audioExtension, setAudioExtension] = useState<string>();
  const [message, setMessage] = useState<string>('');

  const publishEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('Publishing your chart...');

    const formData = new FormData(event.currentTarget);
    formData.append('genre', chartInfo.genre);
    formData.append('album', chartInfo.album);
    formData.append('year', chartInfo.year);
    formData.append('cover', cover);
    formData.append('audio', audio);
    formData.append('chart', new File(
        [chart], `${chartInfo.title}.chart`, { type: 'text/plain' },
    ));

    const audioHowl = new Howl({
      src: [audioUrl],
      format: audioExtension,
      autoplay: false,
    });

    formData.append('duration', audioHowl.duration().toString());

    fetch(MASTER_SERVER.publishChart, {
      method: 'PUT',
      body: formData,
    }).then(
        (response) => response.json(),
    ).then(({ chartId }: PublishChartResponseSchema) => {
      window.location.assign('charts.html?' + new URLSearchParams({ chartId }));
    }).catch(() => {
      setMessage('Backend service not available.');
    });
  };

  const downloadEventHandler = () => {
    setMessage('Preparing your download...');

    const zip = new JSZip();
    const folder = zip.folder(`${chartInfo.artist} - ${chartInfo.title}`);

    if (folder === null) {
      return console.error('cannot create zip folder');
    }

    const imageExtension = cover.name.split('.').pop() || 'png';
    const audioExtension = audio.name.split('.').pop() || 'ogg';
    const files: Record<string, Blob> = {
      [`album.${imageExtension}`]: cover,
      'notes.chart': new Blob([chart], { type: 'text/plain' }),
      [`song.${audioExtension}`]: audio,
    };

    Object.entries(files).forEach(([filename, blob]) => {
      folder.file(filename, blob);
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const timestamp = new Date().getTime();
      saveAs(
          content,
          `${chartInfo.artist}-${chartInfo.title}-${timestamp}.zip`,
      );
      setMessage('');
    });
  };

  useEffect(() => {
    setChartObject(parseChartFile(chart));
    setAudioUrl(URL.createObjectURL(audio));
    setAudioExtension(audio.name.split('.').pop());

    return () => {
      audioUrl.length > 0 && URL.revokeObjectURL(audioUrl);
    };
  }, []);

  return (
    <main className='container inner-container flex-col'>
      {
        message.length > 0 && <Snackbar position='bottom right'>
          <p>{message}</p>
        </Snackbar>
      }
      <h2 className='section-title'>
        {`${chartInfo.title} - ${chartInfo.artist}`}
      </h2>
      <div className='content-container flex-row'>
        <form id='song-info-form' className='song-info-form'
          onSubmit={publishEventHandler}>
          <h2 className='form-title'>Song Info</h2>
          <InputField htmlLabel='title' name='title'
            value={chartInfo.title} readOnly required/>
          <InputField htmlLabel='original artist' name='artist'
            value={chartInfo.artist} readOnly required/>
          <InputField htmlLabel='date created' name='createdAt' value={
            new Date(chartInfo.createdAt).toLocaleDateString()} readOnly/>
          <InputField htmlLabel='Youtube/Spotify link' name='link'
            value={chartInfo.link} readOnly={readOnly}/>
          <InputField htmlLabel='charter' name='charter'
            value={chartInfo.charter} readOnly={readOnly} required/>
        </form>
        <div className='chart-visualization-container flex-col'>
          <div className='difficulty-levels flex-row align-center'>
            <Button className='th-tab' disabled><span>Easy</span></Button>
            <Button className='th-tab' disabled><span>Medium</span></Button>
            <Button className='th-tab' disabled><span>Hard</span></Button>
            <Button className='th-tab active'><span>Expert</span></Button>
          </div>
          {
            chartObject && audioUrl.length > 0 &&
            <ChartVisualization chartObject={chartObject}
              audioUrl={audioUrl} audioExtension={audioExtension}/>
          }
        </div>
      </div>
      {!readOnly && <div className='actions flex-row align-center justify-end'>
        <Button className='th-btn-no' onClick={() => window.location.reload()}>
          <span>start over</span>
        </Button>
        <Button type='submit' form='song-info-form'>
          <span>publish</span>
        </Button>
        <Button onClick={downloadEventHandler}>
          <DownloadIcon width='18' height='16.5' viewBox='0 0 24 22'/>
          <span>download</span>
        </Button>
      </div>}
    </main>
  );
};

export default ChartView;
