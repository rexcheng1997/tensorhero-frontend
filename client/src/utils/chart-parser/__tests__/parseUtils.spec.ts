/* eslint-disable max-len */
import {
  ChartSongObjectInterface,
  ChartObjectInterface,
  ChartSyncTrackObjectInterface,
  NoteDescription,
  NoteType,
} from '../interface';
import {
  parseChartEventObject,
  parseChartNoteObject,
  parseChartSongObject,
  parseChartSyncTrackObject,
} from '../parserUtils';

describe('parseUtils.ts test suite', () => {
  test('parseChartSongObject should throw an error if the chartObject passed in does not contain the key "Song"', () => {
    const chartObject = {} as ChartObjectInterface;

    try {
      parseChartSongObject('Name = "Ouray"', chartObject);
    } catch (error) {
      expect(error).toEqual(new Error('Assign values to chartObject["Song"] before the key "Song" is created'));
    }
  });

  test('parseChartSongObject should parse the lines correctly', () => {
    const chartObject = {
      Song: {} as ChartSongObjectInterface,
    } as ChartObjectInterface;

    const correctResult = {
      Song: {} as ChartSongObjectInterface,
    } as ChartObjectInterface;

    correctResult.Song.Name = 'Ouray';
    expect(parseChartSongObject('Name = "Ouray"', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.Song.Artist = 'Andy McKee';
    expect(parseChartSongObject('Artist = "Andy McKee"', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.Song.Offset = '0';
    expect(parseChartSongObject('Offset = 0', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.Song.Genre = 'Acoustic';
    expect(parseChartSongObject('Genre = "Acoustic"', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);
  });

  test('parseChartSyncTrackObject should throw an error if the chartObject passed in does not contain the key "SyncTrack"', () => {
    const chartObject = {} as ChartObjectInterface;

    try {
      parseChartSyncTrackObject('0 = TS 4', chartObject);
    } catch (error) {
      expect(error).toEqual(new Error('Assign values to chartObject["SyncTrack"] before the key "SyncTrack" is created'));
    }
  });

  test('parseChartSyncTrackObject should throw an error if chartObject.SyncTrack does not contain the key "TimeSignatureChanges"', () => {
    const chartObject = {
      SyncTrack: {
        BPMChanges: [],
      } as unknown as ChartSyncTrackObjectInterface,
    } as ChartObjectInterface;

    try {
      parseChartSyncTrackObject('0 = TS 4', chartObject);
    } catch (error) {
      expect(error).toEqual(new Error('chartObject.SyncTrack.TimeSignatureChanges has not been created as an Array'));
    }
  });

  test('parseChartSyncTrackObject should throw an error if chartObject.SyncTrack does not contain the key "BPMChanges"', () => {
    const chartObject = {
      SyncTrack: {
        TimeSignatureChanges: [],
      } as unknown as ChartSyncTrackObjectInterface,
    } as ChartObjectInterface;

    try {
      parseChartSyncTrackObject('0 = TS 4', chartObject);
    } catch (error) {
      expect(error).toEqual(new Error('chartObject.SyncTrack.BPMChanges has not been created as an Array'));
    }
  });

  test('parseChartSyncTrackObject should parse the lines correctly', () => {
    const chartObject = {
      SyncTrack: {
        TimeSignatureChanges: [],
        BPMChanges: [],
      } as ChartSyncTrackObjectInterface,
    } as ChartObjectInterface;

    const correctResult = {
      SyncTrack: {
        TimeSignatureChanges: [],
        BPMChanges: [],
      } as ChartSyncTrackObjectInterface,
    } as ChartObjectInterface;

    correctResult.SyncTrack.TimeSignatureChanges.push([0, 4]);
    expect(parseChartSyncTrackObject('0 = TS 4', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.SyncTrack.BPMChanges.push([0, 120]);
    expect(parseChartSyncTrackObject('0 = B 120000', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    expect(parseChartSyncTrackObject('768 = E solo', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.SyncTrack.BPMChanges.push([768, 115.4]);
    expect(parseChartSyncTrackObject('768 = B 115400', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.SyncTrack.TimeSignatureChanges.push([1150, 3]);
    expect(parseChartSyncTrackObject('1150 = TS 3', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);
  });

  test('parseChartEventObject should throw an error if chartObject passed in does not contain the key "Events"', () => {
    const chartObject = {} as ChartObjectInterface;

    try {
      parseChartEventObject('960 = E "section The Forgotten (Part One) - Guitar Solo 1a"', chartObject);
    } catch (error) {
      expect(error).toEqual(new Error('Assign values to chartObject["Events"] before the key "Events" is created'));
    }
  });

  test('parseChartEventObject should parse the lines correctly', () => {
    const chartObject = {
      Events: [],
    } as unknown as ChartObjectInterface;

    const correctResult = {
      Events: [],
    } as unknown as ChartObjectInterface;

    correctResult.Events.push([960, 'section The Forgotten (Part One) - Guitar Solo 1a']);
    expect(parseChartEventObject('960 = E "section The Forgotten (Part One) - Guitar Solo 1a"', chartObject))
        .toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    expect(parseChartEventObject('12580 = B 120000', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.Events.push([105840, 'end']);
    expect(parseChartEventObject('105840 = E end', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);
  });

  test('parseChartNoteObject should throw an error if chartObject passed in does not contain the key "ExpertSingle"', () => {
    const chartObject = {} as ChartObjectInterface;

    try {
      parseChartNoteObject('768 = N 0 0', chartObject);
    } catch (error) {
      expect(error).toEqual(new Error('Assign values to chartObject["ExpertSingle"] before the key "ExpertSingle" is created'));
    }
  });

  test('parseChartNoteObject should parse the lines correctly', () => {
    const chartObject = {
      ExpertSingle: [],
    } as unknown as ChartObjectInterface;

    const correctResult = {
      ExpertSingle: [],
    } as unknown as ChartObjectInterface;

    correctResult.ExpertSingle.push({
      tick: 768,
      type: NoteType.NOTE,
      description: NoteDescription.GREEN,
      sustainLength: 0,
    });

    expect(parseChartNoteObject('768 = N 0 0', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.ExpertSingle.push({
      tick: 864,
      type: NoteType.NOTE,
      description: NoteDescription.RED,
      sustainLength: 0,
    });

    expect(parseChartNoteObject('864 = N 1 0', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.ExpertSingle.push({
      tick: 1536,
      type: NoteType.NOTE,
      description: NoteDescription.ORANGE,
      sustainLength: 760,
    });

    expect(parseChartNoteObject('1536 = N 4 760', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    correctResult.ExpertSingle.push({
      tick: 5472,
      type: NoteType.STARPOWER_PHRASE,
      description: NoteDescription.YELLOW,
      sustainLength: 768,
    });

    expect(parseChartNoteObject('5472 = S 2 768', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);

    expect(parseChartNoteObject('6528 = N 5 0', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);
    expect(parseChartNoteObject('8448 = N 6 0', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);
    expect(parseChartNoteObject('8640 = N 7 0', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);
    expect(parseChartNoteObject('12800 = E solo', chartObject)).toEqual(correctResult);
    expect(chartObject).toEqual(correctResult);
  });
});
