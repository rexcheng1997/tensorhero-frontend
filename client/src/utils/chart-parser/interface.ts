// interface designed based on the example .chart file at https://github.com/elliottwaissbluth/tensor-hero/blob/main/example_song/notes.chart

export interface ChartSongObjectInterface {
  Name: string,
  Artist: string,
  Charter?: string,
  Album?: string,
  Year?: string,
  Offset: string,
  Resolution: string,
  Player2: string,
  Difficulty: string,
  PreviewStart: string,
  PreviewEnd: string,
  Genre: string,
  MediaType: string,
  MusicStream: string,
};
export type ChartSongObjectKeys = keyof ChartSongObjectInterface;

export type Tick = Number;
export type TimeSignature = Number;
export type BPM = Number;

export enum SyncTrackType {
  // eslint-disable-next-line no-unused-vars
  TIME_SIGNATURE = 'TS', BPM = 'B',
};
export const SyncTrackTypeMapping: Readonly<
    Record<string, SyncTrackType>
> = {
  'TS': SyncTrackType.TIME_SIGNATURE,
  'B': SyncTrackType.BPM,
} as const;

export interface ChartSyncTrackObjectInterface {
  TimeSignatureChanges: Array<[Tick, TimeSignature]>,
  BPMChanges: Array<[Tick, BPM]>,
};

export type EventName = string;
export type ChartEventObject = [Tick, EventName];

export enum NoteType {
  // eslint-disable-next-line no-unused-vars
  NOTE = 'N', STARPOWER_PHRASE = 'S',
};
export const NoteTypeMapping: Readonly<Record<string, NoteType>> = {
  'N': NoteType.NOTE,
  'S': NoteType.STARPOWER_PHRASE,
} as const;

export enum NoteDescription {
  // eslint-disable-next-line no-unused-vars
  GREEN = 0, RED = 1, YELLOW = 2, BLUE = 3, ORANGE = 4,
  // eslint-disable-next-line no-unused-vars
  FORCE = 5, TAP_NOTE = 6, OPEN_NOTE = 7,
};
export const NoteDescriptionMapping: Readonly<NoteDescription[]> = [
  NoteDescription.GREEN,
  NoteDescription.RED,
  NoteDescription.YELLOW,
  NoteDescription.BLUE,
  NoteDescription.ORANGE,
  NoteDescription.FORCE,
  NoteDescription.TAP_NOTE,
  NoteDescription.OPEN_NOTE,
] as const;

export type ChartNoteObject = {
  tick: Tick,
  type: NoteType,
  description: NoteDescription,
  sustainLength: Tick,
};

export interface ChartObjectInterface {
  Song: ChartSongObjectInterface,
  SyncTrack: ChartSyncTrackObjectInterface,
  Events: ChartEventObject[],
  ExpertSingle: ChartNoteObject[],
};
export type ChartObjectKeys = keyof ChartObjectInterface;
