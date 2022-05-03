import './style.scss';
import 'components/ChartCard/style.scss';

import React, { FC, useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import Navbar from 'components/Navbar';
import SearchIcon from 'assets/svg/search.svg';
import ChartCard, { ChartDataObject } from 'components/ChartCard';
import ChartPage from './ChartPage';

type GetChartsResponseSchema = {
  charts: ChartDataObject[],
}

const ChartsPage: FC = () => {
  const chartFullList = useRef<ChartDataObject[]>();
  const [displayList, setDisplayList] = useState<ChartDataObject[]>([]);
  const [selectedChart, setSelectedChart] = useState<ChartDataObject>();

  const chartNavigationEventHandler = (chart?: ChartDataObject) => {
    setSelectedChart(chart);
  };

  useEffect(() => {
    fetch('dump/charts.json').then(
        (response) => response.json(),
    ).then((data: GetChartsResponseSchema) => {
      chartFullList.current = data.charts;
      setDisplayList(data.charts);
    });
  }, []);

  return (<>
    <Navbar base='.'/>
    {
      _.isNil(selectedChart) ? (<>
        <header className='container home-background center'>
          <form>
            <div className='input-field'>
              <input type='text' name='search' placeholder='Find Charts'/>
              <SearchIcon width='46px' height='46px' viewBox='0 0 24 24'
                className='search-icon'/>
            </div>
          </form>
        </header>
        <div className='container flex-row align-center space-between'>
          {displayList.map(
              (chart) => <ChartCard key={chart.id}
                data={chart} showDetails={true}
                onClick={chartNavigationEventHandler}/>,
          )}
        </div>
      </>) : (
        <ChartPage data={selectedChart}
          onGoBack={chartNavigationEventHandler}/>
      )
    }
  </>);
};

ReactDom.render(<ChartsPage/>, document.getElementById('root'));
