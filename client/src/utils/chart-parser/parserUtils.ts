import _ from 'lodash';
import {
  ChartSongObjectKeys,
  ChartObjectInterface,
  Tick,
  SyncTrackType,
  SyncTrackTypeMapping,
  TimeSignature,
  BPM,
  EventName,
  NoteTypeMapping,
  NoteDescriptionMapping,
  NoteDescription,
} from './interface';

export type parseFunctionType = (
  line: string,
  chartObject: ChartObjectInterface,
) => ChartObjectInterface;

/**
 * Parses a line in the .chart file into a ChartSongObject
 * assuming the line follows the ChartSongObject format
 * @param {string} line a line in the .chart file
 * @param {ChartObjectInterface} chartObject
 *  chartObject to write parsed data into
 * @return {ChartObjectInterface} the chartObject passed in
 */
export function parseChartSongObject(
    line: string,
    chartObject: ChartObjectInterface,
): ChartObjectInterface {
  if (!_.has(chartObject, 'Song')) {
    throw new Error(
        'Assign values to chartObject["Song"] before the key "Song" is created',
    );
  }

  const elements = line.split(' = ');
  const key = elements[0] as ChartSongObjectKeys;
  let value = elements[1];

  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.substring(1, value.length - 1);
  }

  chartObject['Song'][key] = value;

  return chartObject;
};

/**
 * Parses a line in the .chart file into a ChartSyncTrackObject
 * assuming the line follows the ChartSyncTrackObject format
 * @param {string} line a line in the .chart file
 * @param {ChartObjectInterface} chartObject
 *  chartObject to write parsed data into
 * @return {ChartObjectInterface} the chartObject passed in
 */
export function parseChartSyncTrackObject(
    line: string,
    chartObject: ChartObjectInterface,
): ChartObjectInterface {
  if (!_.has(chartObject, 'SyncTrack')) {
    throw new Error(
        // eslint-disable-next-line max-len
        'Assign values to chartObject["SyncTrack"] before the key "SyncTrack" is created',
    );
  }

  if (!_.has(chartObject, 'SyncTrack.TimeSignatureChanges')) {
    throw new Error(
        // eslint-disable-next-line max-len
        'chartObject.SyncTrack.TimeSignatureChanges has not been created as an Array',
    );
  }

  if (!_.has(chartObject, 'SyncTrack.BPMChanges')) {
    throw new Error(
        // eslint-disable-next-line max-len
        'chartObject.SyncTrack.BPMChanges has not been created as an Array',
    );
  }

  const elements = line.split(' ');

  // skip the line if not following the expected format
  if (!_.has(SyncTrackTypeMapping, elements[2])) {
    return chartObject;
  }

  const tick: Tick = parseInt(elements[0]);
  const syncTrackType: SyncTrackType = SyncTrackTypeMapping[elements[2]];

  switch (syncTrackType) {
    case SyncTrackType.TIME_SIGNATURE:
      chartObject.SyncTrack.TimeSignatureChanges.push(
          [tick, parseInt(elements[3]) as TimeSignature],
      );
      break;

    case SyncTrackType.BPM:
      chartObject.SyncTrack.BPMChanges.push(
          [tick, parseInt(elements[3]) / 1e3 as BPM],
      );
      break;
  }

  return chartObject;
};

/**
 * Parses a line in the .chart file into a ChartEventObject
 * assuming the line follows the ChartEventObject format
 * @param {string} line a line in the .chart file
 * @param {ChartObjectInterface} chartObject
 *  chartObject to write parsed data into
 * @return {ChartObjectInterface} the chartObject passed in
 */
export function parseChartEventObject(
    line: string,
    chartObject: ChartObjectInterface,
): ChartObjectInterface {
  if (!_.has(chartObject, 'Events')) {
    throw new Error(
        // eslint-disable-next-line max-len
        'Assign values to chartObject["Events"] before the key "Events" is created',
    );
  }

  const elements = line.split(' = ');

  // skip the line if not following the expected format
  if (!elements[1].startsWith('E')) return chartObject;

  const tick: Tick = parseInt(elements[0]);
  let eventName: EventName = elements[1].substring(2); // trim the leading "E "

  if (eventName.startsWith('"') && eventName.endsWith('"')) {
    eventName = eventName.substring(1, eventName.length - 1);
  }

  chartObject.Events.push([tick, eventName]);

  return chartObject;
};

/**
 * Parses a line the .chart file into a ChartNoteObject
 * assuming the line follows the ChartNoteObject format
 * @param {string} line a line in the .chart file
 * @param {ChartObjectInterface} chartObject
 *  chartObject to write parsed data into
 * @return {ChartObjectInterface} the chartObject passed in
 */
export function parseChartNoteObject(
    line: string,
    chartObject: ChartObjectInterface,
): ChartObjectInterface {
  if (!_.has(chartObject, 'ExpertSingle')) {
    throw new Error(
        // eslint-disable-next-line max-len
        'Assign values to chartObject["ExpertSingle"] before the key "ExpertSingle" is created',
    );
  }

  const elements = line.split(' ');

  // skip the line if not following the expected format
  if (!_.has(NoteTypeMapping, elements[2])) return chartObject;

  const tick: Tick = parseInt(elements[0]);
  const type = NoteTypeMapping[elements[2]];
  const description = NoteDescriptionMapping[parseInt(elements[3])];
  const sustainLength: Tick = parseInt(elements[4]);

  if (![
    NoteDescription.FORCE,
    NoteDescription.TAP_NOTE,
    NoteDescription.OPEN_NOTE,
  ].includes(description)) {
    chartObject.ExpertSingle.push({ tick, type, description, sustainLength });
  }

  return chartObject;
};
