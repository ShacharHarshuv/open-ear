import { INoteEvent } from '../../services/player.service';
import * as _ from 'lodash';
import { Subdivision } from 'tone/build/esm/core/type/Units';
import { NoteNumberOrName } from './NoteNumberOrName';
import { toNoteName } from './toNoteName';

export function generateSteadyMonophonicMelody(noteList: NoteNumberOrName[], noteDuration: Subdivision = '4n'): INoteEvent[] {
  let numberOfNotes: number = 0;
  return _.map(noteList, (frequency: NoteNumberOrName): INoteEvent => ({
    notes: toNoteName(frequency),
    time: {
      [noteDuration]: numberOfNotes++,
    },
    duration: noteDuration,
  }))
}
