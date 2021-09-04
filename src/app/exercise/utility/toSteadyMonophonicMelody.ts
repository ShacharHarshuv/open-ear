import { NoteEvent } from '../../services/player.service';
import * as _ from 'lodash';
import { Subdivision } from 'tone/build/esm/core/type/Units';
import { NoteNumberOrName } from './NoteNumberOrName';
import { toNoteName } from './toNoteName';
import {
  OneOrMany,
  toArray
} from './toArray';

/*
* If got NoteEvent for input it doesn't change it
* */
export function toSteadyMonophonicMelody(noteList: OneOrMany<NoteNumberOrName | NoteEvent>, noteDuration: Subdivision = '4n'): NoteEvent[] {
  let numberOfNotes: number = 0;
  return _.map(toArray(noteList), (frequencyOrEvent: NoteNumberOrName | NoteEvent): NoteEvent => {
    if(typeof frequencyOrEvent === 'object') {
      return frequencyOrEvent;
    }
    return {
      notes: toNoteName(frequencyOrEvent),
      time: {
        [noteDuration]: numberOfNotes++,
      },
      duration: noteDuration,
    };
  })
}
