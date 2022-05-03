import React, { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { formatTimestamp } from 'utils/chart-visualization';
import Button from 'components/Button';
import ChartCard, { ChartDataObject } from 'components/ChartCard';
import ChartVisualization from 'components/ChartVisualization';
import parseChartFile, { ChartObjectInterface } from 'utils/chart-parser';
import DurationIcon from 'assets/svg/duration.fill.svg';
import DifficultyLevelIcon from 'assets/svg/difficulty-level.fill.svg';
import SpeedIcon from 'assets/svg/speed.fill.svg';
import FullComboIcon from 'assets/svg/full-combo.fill.svg';

type ChartPageProps = {
  data: ChartDataObject,
  onGoBack: () => void,
}

const ChartPage: FC<ChartPageProps> = ({
  data, onGoBack: goBackEventHandler,
}) => {
  const [chartObject, setChartObject] = useState<ChartObjectInterface>();

  useEffect(() => {
    fetch(data.chart.expert!).then(
        (response) => response.text(),
    ).then((chartFile) => {
      setChartObject(parseChartFile(chartFile));
    });
  }, []);

  return (
    <div className='container' style={{ marginTop: '2rem' }}>

      <h2 className='go-back' onClick={() => goBackEventHandler()}>
        {'< Back'}
      </h2>

      <div className='flex-row'>

        <main className='chart-page-main flex-col'>

          <ChartCard data={data} showDetails={false}/>

          <div className='purple-container flex-row align-center'>
            <h3 className='tag-title'>Tags</h3>
            <div className='flex-row align-center'>
              <span className='tag'>{data.genre}</span>
            </div>
          </div>

          <div className='details flex-row space-between'>
            <div className='column flex-col'>
              <div className='detail-title flex-row align-center'>
                <DurationIcon width='30' height='30' viewBox='0 0 41 41'/>
                <span>Length</span>
              </div>
              <div className='detail-text flex-col'>
                <span>{formatTimestamp(data.duration)}</span>
              </div>
            </div>
            <div className='column flex-col'>
              <div className='detail-title flex-row align-center'>
                <DifficultyLevelIcon width='30' height='28'
                  viewBox='0 0 44 41'/>
                <span>Difficulty</span>
              </div>
              <div className='detail-text difficulty-level flex-col'>
                {_.has(data, 'chart.easy') &&
                <div className='flex-row align-center'>
                  <span className='level easy'/>
                  <span>Easy</span>
                </div>}
                {_.has(data, 'chart.medium') &&
                <div className='flex-row align-center'>
                  <span className='level medium'/>
                  <span>Medium</span>
                </div>}
                {_.has(data, 'chart.hard') &&
                <div className='flex-row align-center'>
                  <span className='level hard'/>
                  <span>Hard</span>
                </div>}
                {_.has(data, 'chart.expert') &&
                <div className='flex-row align-center'>
                  <span className='level expert'/>
                  <span>Expert</span>
                </div>}
              </div>
            </div>
            <div className='column flex-col'>
              <div className='detail-title flex-row align-center'>
                <SpeedIcon width='30' height='30' viewBox='0 0 41 41'/>
                <span>Highest Speed</span>
              </div>
              <div className='detail-text flex-col'></div>
            </div>
            <div className='column flex-col'>
              <div className='detail-title flex-row align-center'>
                <FullComboIcon width='30' height='30' viewBox='0 0 41 41'/>
                <span>Full Combo</span>
              </div>
              <div className='detail-text flex-col'>
                {data.fullCombo && <span>Full Combo</span>}
              </div>
            </div>
          </div>

          <div className='visualization-container'>
            <div className='purple-container flex-row'>
              <div className='difficulty-levels flex-row align-center'>
                <Button className='th-tab' disabled><span>Easy</span></Button>
                <Button className='th-tab' disabled><span>Medium</span></Button>
                <Button className='th-tab' disabled><span>Hard</span></Button>
                <Button className='th-tab active'><span>Expert</span></Button>
              </div>
            </div>
            {!_.isNil(chartObject) && <ChartVisualization
              chartObject={chartObject}
              audioUrl={data.audio}/>}
          </div>

        </main>

        <div className='related-charts'>
          <h3 className='title'>Related Charts</h3>
        </div>

      </div>
    </div>
  );
};

export default ChartPage;
