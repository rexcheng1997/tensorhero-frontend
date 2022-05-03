import React, { FC, useEffect, useRef, useState } from 'react';
import SearchIcon from 'assets/svg/search.svg';
import ChartCard, { ChartDataObject } from 'components/ChartCard';

type ChartListingProps = {
  onSelect: (chart: ChartDataObject) => void,
};

type GetChartsResponseSchema = {
  charts: ChartDataObject[],
}

const ChartListing: FC<ChartListingProps> = ({
  onSelect,
}) => {
  const chartFullList = useRef<ChartDataObject[]>();
  const [displayList, setDisplayList] = useState<ChartDataObject[]>([]);

  const createChartCardClickEventHandler = (chart: ChartDataObject) => () => {
    onSelect(chart);
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
      {displayList.map((chart) => <ChartCard key={chart.id}
        data={chart} showDetails={true}
        onClick={createChartCardClickEventHandler(chart)}/>,
      )}
    </div>
  </>);
};

export default ChartListing;
