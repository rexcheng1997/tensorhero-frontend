import React, { FC, useEffect, useRef, useState } from 'react';
import ChartCard, { ChartDataObject } from 'components/ChartCard';
import TrieNode from 'utils/TrieNode';
import SearchIcon from 'assets/svg/search.svg';

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
  const prefixTree = useRef<TrieNode<ChartDataObject>>(new TrieNode());
  const [displayList, setDisplayList] = useState<ChartDataObject[]>([]);

  const searchFormSubmitEventHandler = (
      event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = new URLSearchParams();

    for (const [key, value] of form.entries()) {
      query.append(key, value as string);
    }

    window.history.replaceState(
        Object.fromEntries(query),
        document.title,
        window.location.pathname + '?' + query.toString(),
    );

    const searchKey = query.get('search');
    if (searchKey !== null && searchKey.length > 0) {
      setDisplayList(prefixTree.current.searchPhrase(searchKey));
    } else {
      setDisplayList(chartFullList.current || []);
    }
  };

  const createChartCardClickEventHandler = (chart: ChartDataObject) => () => {
    onSelect(chart);
  };

  useEffect(() => {
    fetch('dump/charts.json').then(
        (response) => response.json(),
    ).then((data: GetChartsResponseSchema) => {
      chartFullList.current = data.charts;
      setDisplayList(data.charts);
      data.charts.forEach((chart) => {
        const key = [
          chart.title, chart.artist, chart.charter, chart.genre,
        ].join(' ');
        prefixTree.current.addPhrase(key, chart);
      });
    });
  }, []);

  return (<>
    <header className='container home-background center'>
      <form onSubmit={searchFormSubmitEventHandler}>
        <div className='input-field'>
          <input type='text' name='search' placeholder='Find Charts'/>
          <button type='submit' className='search-icon'>
            <SearchIcon width='46px' height='46px' viewBox='0 0 24 24'/>
          </button>
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
