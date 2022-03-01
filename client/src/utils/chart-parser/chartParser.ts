import _ from 'lodash';
import {
  ChartObjectInterface,
  ChartObjectKeys,
  ChartSongObjectInterface,
} from './interface';
import {
  parseChartEventObject,
  parseChartNoteObject,
  parseChartSongObject,
  parseChartSyncTrackObject,
  parseFunctionType,
} from './parserUtils';

const sectionParser: Readonly<Record<ChartObjectKeys, parseFunctionType>> = {
  Song: parseChartSongObject,
  SyncTrack: parseChartSyncTrackObject,
  Events: parseChartEventObject,
  ExpertSingle: parseChartNoteObject,
} as const;

/**
 * Parses the .chart file into a chartObject
 * @param {string} chartFile the .chart file
 * @return {ChartObjectInterface} a chartObject
 */
export default function parseChartFile(
    chartFile: string,
): ChartObjectInterface {
  const chartObject: ChartObjectInterface = {
    Song: {} as ChartSongObjectInterface,
    SyncTrack: {
      TimeSignatureChanges: [],
      BPMChanges: [],
    },
    Events: [],
    ExpertSingle: [],
  };

  const lines = chartFile.split('\n');
  let section = '';

  for (let line of lines) {
    line = line.trim();

    if (line.length === 0) continue;

    if (line.startsWith('[') && line.endsWith(']')) {
      section = line.substring(1, line.length - 1);
      if (!_.has(chartObject, section)) {
        throw new Error(`Unknown section in the chart file: ${line}`);
      }
    } else if (line !== '{' && line !== '}' && section.length > 0) {
      sectionParser[section as ChartObjectKeys](line, chartObject);
    }
  }

  return chartObject;
};
