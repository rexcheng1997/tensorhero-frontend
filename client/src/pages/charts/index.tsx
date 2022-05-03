import './style.scss';
import 'components/ChartCard/style.scss';

import React, { FC, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import qs from 'qs';
import Navbar from 'components/Navbar';
import { ChartDataObject } from 'components/ChartCard';
import ChartPage from './ChartPage';
import ChartListing from './ChartListing';

const ChartsPage: FC = () => {
  const queryParams = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  const [renderListing, setRenderListing] = useState<boolean>(
      !_.has(queryParams, 'chartId'),
  );
  const [selectedChart, setSelectedChart] = useState<ChartDataObject>();

  const updateSelectedChart = (chart: ChartDataObject) => {
    setSelectedChart(chart);
    setRenderListing(false);
  };

  const clearSelectedChart = () => {
    setSelectedChart(undefined);
    setRenderListing(true);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  useEffect(() => {
    if (_.has(queryParams, 'chartId')) {
      const chartId = _.get(queryParams, 'chartId');
      fetch(`dump/chart-${chartId}.json`).then(
          (response) => response.json(),
      ).then((chart: ChartDataObject) => {
        setSelectedChart(chart);
      });
    }
  }, []);

  return (<>
    <Navbar base='.'/>
    {
      renderListing || _.isNil(selectedChart) ? (
        <ChartListing onSelect={updateSelectedChart}/>
      ) : (
        <ChartPage data={selectedChart} onGoBack={clearSelectedChart}/>
      )
    }
  </>);
};

ReactDom.render(<ChartsPage/>, document.getElementById('root'));
