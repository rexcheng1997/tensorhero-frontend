import './style.scss';

import React, { FC, useState } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import Navbar from 'components/Navbar';
import Upload, { SongInfo } from './Upload';
import ChartView, { ChartInfo } from './ChartView';
import ProgressReport from './ProgressReport';

const GenerateCHLevelPage: FC = () => {
  const [data, setData] = useState<FormData>();
  const [chartInfo, setChartInfo] = useState<ChartInfo>();
  const [chartFile, setChartFile] = useState<string>('');
  const [audioFile, setAudioFile] = useState<File>();
  const [coverFile, setCoverFile] = useState<File>();

  const uploadEventHandler = (formData: FormData) => {
    setData(formData);
    setAudioFile(formData.get('audio') as SongInfo['audio']);
    setCoverFile(formData.get('cover') as SongInfo['cover']);
    setChartInfo({
      title: formData.get('title') as SongInfo['title'],
      artist: formData.get('artist') as SongInfo['artist'],
      genre: formData.get('genre') as SongInfo['genre'] || '',
      album: formData.get('album') as SongInfo['album'] || '',
      year: formData.get('year') as SongInfo['year'] || '',
      createdAt: new Date().toJSON(),
    });
  };

  const awaitingUserUpload = (
    _.isNil(audioFile) || _.isNil(coverFile) || _.isNil(data)
  );
  const awaitingMLOutput = !awaitingUserUpload && chartFile.length === 0;
  const chartReady = (
    !awaitingUserUpload && chartFile.length > 0 && !_.isNil(chartInfo)
  );

  return (<>
    <Navbar base='.'/>
    <div className='container page-height center pattern-background'>

      {awaitingUserUpload && <Upload onSubmit={uploadEventHandler}/>}

      {awaitingMLOutput && <ProgressReport data={data}
        onChartReady={setChartFile}/>}

      {chartReady && <ChartView chartInfo={chartInfo}
        chart={chartFile} audio={audioFile} cover={coverFile}
        readOnly={false}/>}

    </div>
  </>);
};

ReactDom.render(<GenerateCHLevelPage/>, document.getElementById('root'));
