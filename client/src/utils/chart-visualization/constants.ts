import { NoteDescription } from 'utils/chart-parser';

export const COLORS = {
  WHITE: 0xffffff,
  BLACK: 0x000000,
  GRAY: 0x404040,
  LIGHT_GRAY: 0xc7c7c7,
} as const;

export const NOTE_COLORS = {
  [NoteDescription.GREEN]: 0X45f400,
  [NoteDescription.RED]: 0xff0000,
  [NoteDescription.YELLOW]: 0xfcee00,
  [NoteDescription.BLUE]: 0x315dff,
  [NoteDescription.ORANGE]: 0xffa100,
  [NoteDescription.FORCE]: 0xffffff,
  [NoteDescription.OPEN_NOTE]: 0xffffff,
  [NoteDescription.TAP_NOTE]: 0xffffff,
};

export const FRETBOARD = {
  LINEWIDTH_SLIM: 0.5,
  LINEWIDTH_LIGHT: 1,
  LINEWIDTH_NORMAL: 1.5,
  LINEWIDTH_BOLD: 2,
  LINEWIDTH_EXTRA: 5,
  SIDE_GAP: 5,
} as const;

export const MIN_NOTE_RADIUS = 8;
export const DEFAULT_PIXELS_PER_TICK = 0.5;
