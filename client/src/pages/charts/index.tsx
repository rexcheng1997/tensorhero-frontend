import './style.scss';
import 'components/ChartCard/style.scss';

import React, { FC, useState } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import Navbar from 'components/Navbar';
import { ChartDataObject } from 'components/ChartCard';
import ChartPage from './ChartPage';
import ChartListing from './ChartListing';

const ChartsPage: FC = () => {
  const [selectedChart, setSelectedChart] = useState<ChartDataObject>();

  const clearSelectedChart = () => {
    setSelectedChart(undefined);
  };

  return (<>
    <Navbar base='.'/>
    {
      _.isNil(selectedChart) ? (
        <ChartListing onSelect={setSelectedChart}/>
      ) : (
        <ChartPage data={selectedChart} onGoBack={clearSelectedChart}/>
      )
    }
  </>);
};

ReactDom.render(<ChartsPage/>, document.getElementById('root'));
