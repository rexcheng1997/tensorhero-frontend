import './style.scss';

import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import qs from 'qs';
import parseChartFile, {
  ChartObjectInterface,
} from 'utils/chart-parser';
import ChartVisualization from 'components/ChartVisualization';

const ChartVizDemoApp: FC = () => {
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [chartObject, setChartObject] = useState<ChartObjectInterface>();

  useEffect(() => {
    const queryParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    if (!_.has(queryParams, 'song')) return;

    fetch(`${queryParams.song}/notes.chart`).then(
        (response) => response.text(),
    ).then((chartFile) => {
      setAudioUrl(`${queryParams.song}/song.ogg`);
      setChartObject(parseChartFile(chartFile));
    }).catch(
        (error) => console.error(error),
    );
  }, []);

  const audioAndChartReady = !_.isNil(chartObject) && audioUrl.length > 0;

  return (
    <div className='container center page-height'>
      {audioAndChartReady && <ChartVisualization
        chartObject={chartObject}
        audioUrl={audioUrl}
      />}
    </div>
  );
};

ReactDom.render(<ChartVizDemoApp/>, document.getElementById('root'));
