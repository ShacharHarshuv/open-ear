import { INoteEvent } from '../../services/player.service';
import * as _ from 'lodash';
import { Subdivision } from 'tone/build/esm/core/type/Units';
import { Note } from 'tone/Tone/core/type/NoteUnits';

export function generateSteadyMonophonicMelody(noteList: Note[], noteDuration: Subdivision = '4n'): INoteEvent[] {
  let numberOfNotes: number = 0;
  return _.map(noteList, (frequency: Note): INoteEvent => ({
    notes: frequency,
    time: {
      [noteDuration]: numberOfNotes++,
    },
    duration: noteDuration,
  }))
}
