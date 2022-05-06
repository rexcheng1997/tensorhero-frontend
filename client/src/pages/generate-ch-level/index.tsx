import './style.scss';

import React, { FC, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import Navbar from 'components/Navbar';
import Upload, { SongInfo } from './Upload';
import ChartView, { ChartInfo } from './ChartView';
import ProgressReport from './ProgressReport';

const GenerateCHLevelPage: FC = () => {
  const [chartInfo, setChartInfo] = useState<ChartInfo>();
  const [chartFile, setChartFile] = useState<string>('');
  const [audioFile, setAudioFile] = useState<File>();
  const [coverFile, setCoverFile] = useState<File>();

  const uploadEventHandler = (formData: FormData) => {
    setAudioFile(formData.get('audio') as SongInfo['audio']);
    setCoverFile(formData.get('cover') as SongInfo['cover']);
    setChartInfo({
      title: formData.get('title') as SongInfo['title'],
      artist: formData.get('artist') as SongInfo['artist'],
      createdAt: new Date().toJSON(),
    });
  };

  useEffect(() => {
    // fetch('examples/Andy McKee - Ouray/notes.chart').then(
    //     (response) => response.text(),
    // ).then((chartFile) => {
    //   setChartInfo({
    //     title: 'Ouray',
    //     artist: 'Andy McKee',
    //     createdAt: new Date().toJSON(),
    //   });
    //   setChartObject(parseChartFile(chartFile));
    //   setAudioUrl('examples/Andy McKee - Ouray/song.ogg');
    // });
  }, []);

  const awaitingUserUpload = _.isNil(audioFile) || _.isNil(coverFile);
  const awaitingMLOutput = !awaitingUserUpload && chartFile.length === 0;
  const chartReady = (
    !awaitingUserUpload && chartFile.length > 0 && !_.isNil(chartInfo)
  );

  return (<>
    <Navbar base='.'/>
    <div className='container page-height center pattern-background'>

      {awaitingUserUpload && <Upload onSubmit={uploadEventHandler}/>}

      {awaitingMLOutput && <ProgressReport/>}

      {chartReady && <ChartView chartInfo={chartInfo}
        chart={chartFile} audio={audioFile} cover={coverFile}
        readOnly={false}/>}

    </div>
  </>);
};

ReactDom.render(<GenerateCHLevelPage/>, document.getElementById('root'));
