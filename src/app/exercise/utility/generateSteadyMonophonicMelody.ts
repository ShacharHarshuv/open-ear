import { INoteEvent } from '../../services/player.service';
import { Frequency } from 'tone/Tone/core/type/Units';
import * as _ from 'lodash';
import { Subdivision } from 'tone/build/esm/core/type/Units';

export function generateSteadyMonophonicMelody(frequencies: Frequency[], noteDuration: Subdivision = '4n'): INoteEvent[] {
  let numberOfNotes: number = 0;
  return _.map(frequencies, (frequency: Frequency): INoteEvent => ({
    notes: frequency,
    time: {
      [noteDuration]: numberOfNotes++,
    },
    duration: noteDuration,
  }))
}
