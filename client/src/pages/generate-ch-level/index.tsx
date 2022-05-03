import './style.scss';

import React, { FC, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import Navbar from 'components/Navbar';
import Upload, { SongInfo } from './Upload';
import ChartView, { ChartInfo } from './ChartView';
import { ChartObjectInterface } from 'utils/chart-parser';
import ProgressReport from './ProgressReport';

const GenerateCHLevelPage: FC = () => {
  const [chartInfo, setChartInfo] = useState<ChartInfo>();
  const [chartObject] = useState<ChartObjectInterface>();
  const [audioUrl, setAudioUrl] = useState<string>('');

  const uploadEventHandler = (formData: FormData) => {
    setChartInfo({
      title: formData.get('title') as SongInfo['title'],
      artist: formData.get('artist') as SongInfo['artist'],
      createdAt: new Date().toJSON(),
    });
    setAudioUrl(
        URL.createObjectURL(formData.get('audio') as SongInfo['audio']),
    );
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

    return () => {
      if (audioUrl.length > 0) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  return (<>
    <Navbar base='.'/>
    <div className='container page-height center pattern-background'>
      {audioUrl.length === 0 && <Upload onSubmit={uploadEventHandler}/>}
      {
        _.isNil(chartObject) && audioUrl.length > 0 &&
        <ProgressReport/>
      }
      {
        !_.isNil(chartObject) && !_.isNil(chartInfo) && audioUrl.length > 0 &&
        <ChartView
          chartInfo={chartInfo}
          chartObject={chartObject}
          audioUrl={audioUrl}
          readOnly={false}/>
      }
    </div>
  </>);
};

ReactDom.render(<GenerateCHLevelPage/>, document.getElementById('root'));
