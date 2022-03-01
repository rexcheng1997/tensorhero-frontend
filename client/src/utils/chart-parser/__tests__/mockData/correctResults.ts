import {
  ChartObjectInterface,
  NoteDescription,
  NoteType,
} from '../../interface';

const correctResults: Readonly<Record<string, ChartObjectInterface>> = {
  // ==================================================== //
  // ********************** TEST 1 ********************** //
  // ==================================================== //
  test1: {
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
  },
  // ==================================================== //
  // ********************** TEST 2 ********************** //
  // ==================================================== //
  test2: {
    Song: {
      Name: 'Test 2',
      Artist: 'Artist 2',
      Charter: 'Charter 2',
      Album: 'Album 2',
      Year: ', 1992',
      Offset: '0',
      Resolution: '192',
      Player2: 'bass',
      Difficulty: '4',
      PreviewStart: '0',
      PreviewEnd: '0',
      Genre: 'Rock',
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
  },
  // ==================================================== //
  // ********************** TEST 3 ********************** //
  // ==================================================== //
  test3: {
    Song: {
      Name: 'Test 3',
      Artist: 'Artist 3',
      Charter: 'Charter 3',
      Album: 'Album 3',
      Year: ', 1993',
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
        [1056, 3],
        [1200, 4],
        [1544, 5],
      ],
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
  },
  // ==================================================== //
  // ********************** TEST 4 ********************** //
  // ==================================================== //
  test4: {
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
  },
  // ==================================================== //
  // ********************** TEST 5 ********************** //
  // ==================================================== //
  test5: {
    Song: {
      Name: 'Test 5',
      Artist: 'Artist 5',
      Charter: 'Charter 5',
      Album: 'Album 5',
      Year: ', 1995',
      Offset: '10',
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
    Events: [
      [768, 'section Intro'],
      [2304, 'section Verse 1'],
      [8448, 'section Chorus 1a'],
    ],
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
  },
};

export default correctResults;
