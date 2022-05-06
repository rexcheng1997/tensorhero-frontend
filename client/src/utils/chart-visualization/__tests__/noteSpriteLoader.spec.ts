/* eslint-disable max-len */
import _ from 'lodash';
import * as PIXI from 'pixi.js';
import { NoteDescription } from 'utils/chart-parser';
import createNoteSpriteLoader from '../noteSpriteLoader';

afterEach(() => {
  jest.clearAllMocks();
});

describe('noteSpriteLoader test suite', () => {
  const consoleErrorSpy = jest.spyOn(global.console, 'error');

  test('correct sprites should be loaded properly after createNoteSpriteLoader is called', () => {
    const sprites: { [key: string]: PIXI.Sprite } = {};
    const loader = createNoteSpriteLoader(sprites);

    expect(_.get(loader, 'finished', false)).toBe(false);

    loader.onComplete.add(() => {
      expect(consoleErrorSpy).not.toHaveBeenCalled();

      expect(sprites[NoteDescription[NoteDescription.GREEN]]).toEqual(PIXI.Sprite.from('images/note.green.png'));
      expect(sprites[NoteDescription[NoteDescription.RED]]).toEqual(PIXI.Sprite.from('images/note.red.png'));
      expect(sprites[NoteDescription[NoteDescription.YELLOW]]).toEqual(PIXI.Sprite.from('images/note.yellow.png'));
      expect(sprites[NoteDescription[NoteDescription.BLUE]]).toEqual(PIXI.Sprite.from('images/note.blue.png'));
      expect(sprites[NoteDescription[NoteDescription.ORANGE]]).toEqual(PIXI.Sprite.from('images/note.orange.png'));
      expect(sprites[NoteDescription[NoteDescription.FORCE]]).toBeUndefined();
      expect(sprites[NoteDescription[NoteDescription.TAP_NOTE]]).toBeUndefined();
      expect(sprites[NoteDescription[NoteDescription.OPEN_NOTE]]).toBeUndefined();
      expect(sprites['something not existing']).toBeUndefined();

      expect(_.get(loader, 'finished', false)).toBe(true);
    });
  });
});
