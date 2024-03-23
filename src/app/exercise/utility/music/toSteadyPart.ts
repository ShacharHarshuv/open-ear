import * as _ from 'lodash';
import { Subdivision } from 'tone/build/esm/core/type/Units';
import { NoteEvent } from '../../../services/player.service';
import { OneOrMany, toArray } from '../../../shared/ts-utility/toArray';
import { NoteNumberOrName } from './notes/NoteNumberOrName';
import { toNoteName } from './notes/toNoteName';

/*
 * If got NoteEvent for input it doesn't change it
 * */
export function toSteadyPart(
  noteList: OneOrMany<OneOrMany<NoteNumberOrName> | NoteEvent>,
  noteDuration: Subdivision = '4n',
  velocity = 1,
): NoteEvent[] {
  let numberOfNotes: number = 0;
  return _.map(
    toArray(noteList),
    (frequencyOrEvent: OneOrMany<NoteNumberOrName> | NoteEvent): NoteEvent => {
      if (
        typeof frequencyOrEvent === 'object' &&
        !Array.isArray(frequencyOrEvent)
      ) {
        return frequencyOrEvent;
      }
      return {
        notes: toArray(frequencyOrEvent).map(toNoteName),
        time: {
          [noteDuration]: numberOfNotes++,
        },
        duration: noteDuration,
        velocity: velocity,
      };
    },
  );
}
