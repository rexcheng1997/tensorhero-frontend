import _ from 'lodash';
import * as PIXI from 'pixi.js';
import { NoteDescription } from 'utils/chart-parser';

/**
 * Creates a PIXI loader to load note sprites
 * @param {Object} sprites an empty object to write sprites in
 *   when loading finished
 * @return {PIXI.Loader} the loader used to load the note sprites
 */
export default function createNoteSpriteLoader(
    sprites: { [key: string]: PIXI.Sprite },
): PIXI.Loader {
  const loader = new PIXI.Loader('images');

  loader.add(NoteDescription[NoteDescription.GREEN], 'note.green.png');
  loader.add(NoteDescription[NoteDescription.RED], 'note.red.png');
  loader.add(NoteDescription[NoteDescription.YELLOW], 'note.yellow.png');
  loader.add(NoteDescription[NoteDescription.BLUE], 'note.blue.png');
  loader.add(NoteDescription[NoteDescription.ORANGE], 'note.orange.png');

  loader.load((_self, resources) => {
    for (const noteDescription in NoteDescription) {
      if (_.has(resources, noteDescription)) {
        sprites[noteDescription] = new PIXI.Sprite(
            resources[noteDescription].texture,
        );
      }
    }
  });

  loader.onError.add((error) => console.error(error));

  return loader;
};
