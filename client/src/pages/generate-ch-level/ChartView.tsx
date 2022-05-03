import React, { FC } from 'react';
import ChartVisualization from 'components/ChartVisualization';
import { ChartObjectInterface } from 'utils/chart-parser';
import InputField from 'components/Form/InputField';
import Button from 'components/Button';
import DownloadIcon from 'assets/svg/download.svg';

export type ChartInfo = {
  title: string,
  artist: string,
  createdAt: string,
  link?: string,
  charter?: string,
};
type ChartViewProps = {
  chartInfo: ChartInfo,
  chartObject: ChartObjectInterface,
  audioUrl: string,
  readOnly: boolean,
};

const ChartView: FC<ChartViewProps> = ({
  chartInfo, chartObject, audioUrl, readOnly,
}: ChartViewProps): JSX.Element => {
  return (
    <main className='container inner-container flex-col'>
      <h2 className='section-title'>
        {`${chartInfo.title} - ${chartInfo.artist}`}
      </h2>
      <div className='content-container flex-row'>
        <form id='song-info-form' className='song-info-form'>
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
          <ChartVisualization chartObject={chartObject} audioUrl={audioUrl}/>
        </div>
      </div>
      {!readOnly && <div className='actions flex-row align-center justify-end'>
        <Button className='th-btn-no'><span>start over</span></Button>
        <Button type='submit' form='song-info-form'>
          <span>publish</span>
        </Button>
        <Button>
          <DownloadIcon width='18' height='16.5' viewBox='0 0 24 22'/>
          <span>download</span>
        </Button>
      </div>}
    </main>
  );
};

export default ChartView;
