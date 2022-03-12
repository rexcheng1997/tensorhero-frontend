import {
  ChartObjectInterface,
  NoteDescription,
  NoteType,
} from 'utils/chart-parser';

export const defaultChartObject: ChartObjectInterface = {
  Song: {
    Name: 'Ouray',
    Artist: 'Andy McKee',
    Offset: '0',
    Resolution: '192',
    Player2: 'bass',
    Difficulty: 'expert',
    PreviewStart: '0',
    PreviewEnd: '0',
    MediaType: 'cd',
    MusicStream: 'song.ogg',
  },
  SyncTrack: {
    TimeSignatureChanges: [[0, 4]],
    BPMChanges: [[0, 110]],
  },
  Events: [],
  ExpertSingle: [{
    tick: 768,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 768,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 12,
  }],
};

export const chartObject1: ChartObjectInterface = {
  Song: {
    Name: 'Test 1',
    Artist: 'Artist 1',
    Charter: 'Charter 1',
    Album: 'Album 1',
    Year: ', 1991',
    Offset: '0',
    Resolution: '192',
    Player2: 'bass',
    Difficulty: '4',
    PreviewStart: '0',
    PreviewEnd: '0',
    Genre: 'Instrumental Rock',
    MediaType: 'cd',
    MusicStream: 'song.ogg',
  },
  SyncTrack: {
    TimeSignatureChanges: [[0, 5]],
    BPMChanges: [[0, 148.963]],
  },
  Events: [],
  ExpertSingle: [{
    tick: 960,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 0,
  }, {
    tick: 960,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 0,
  }, {
    tick: 960,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1008,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }, {
    tick: 1008,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1056,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 0,
  }, {
    tick: 1056,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 0,
  }, {
    tick: 1056,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1104,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }, {
    tick: 1104,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1152,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 0,
  }, {
    tick: 1152,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 0,
  }, {
    tick: 1200,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 20,
  }, {
    tick: 1200,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 20,
  }, {
    tick: 1248,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }, {
    tick: 1248,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1296,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 200,
  }, {
    tick: 1296,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 200,
  }, {
    tick: 1296,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 200,
  }, {
    tick: 1544,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }, {
    tick: 1544,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1592,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 0,
  }, {
    tick: 1592,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 0,
  }, {
    tick: 1592,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1640,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }],
};

export const chartObject2: ChartObjectInterface = {
  Song: {
    Name: 'Test 4',
    Artist: 'Artist 4',
    Charter: 'Charter 4',
    Album: 'Album 4',
    Year: ', 1994',
    Offset: '0',
    Resolution: '192',
    Player2: 'bass',
    Difficulty: '4',
    PreviewStart: '0',
    PreviewEnd: '0',
    Genre: 'Instrumental Rock',
    MediaType: 'cd',
    MusicStream: 'song.ogg',
  },
  SyncTrack: {
    TimeSignatureChanges: [
      [0, 5],
      [1200, 4],
      [1544, 5],
    ],
    BPMChanges: [
      [0, 148.963],
      [1152, 114],
      [1536, 112],
    ],
  },
  Events: [],
  ExpertSingle: [{
    tick: 960,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 0,
  }, {
    tick: 960,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 0,
  }, {
    tick: 960,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1008,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }, {
    tick: 1008,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1056,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 0,
  }, {
    tick: 1056,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 0,
  }, {
    tick: 1056,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1104,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }, {
    tick: 1104,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1152,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 0,
  }, {
    tick: 1152,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 0,
  }, {
    tick: 1200,
    type: NoteType.STARPOWER_PHRASE,
    description: NoteDescription.ORANGE,
    sustainLength: 20,
  }, {
    tick: 1200,
    type: NoteType.STARPOWER_PHRASE,
    description: NoteDescription.GREEN,
    sustainLength: 20,
  }, {
    tick: 1248,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }, {
    tick: 1248,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1296,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 200,
  }, {
    tick: 1296,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 200,
  }, {
    tick: 1296,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 200,
  }, {
    tick: 1544,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }, {
    tick: 1544,
    type: NoteType.NOTE,
    description: NoteDescription.YELLOW,
    sustainLength: 0,
  }, {
    tick: 1592,
    type: NoteType.NOTE,
    description: NoteDescription.RED,
    sustainLength: 0,
  }, {
    tick: 1592,
    type: NoteType.NOTE,
    description: NoteDescription.BLUE,
    sustainLength: 0,
  }, {
    tick: 1592,
    type: NoteType.NOTE,
    description: NoteDescription.GREEN,
    sustainLength: 0,
  }, {
    tick: 1640,
    type: NoteType.NOTE,
    description: NoteDescription.ORANGE,
    sustainLength: 0,
  }],
};
