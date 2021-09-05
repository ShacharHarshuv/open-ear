import { NoteEvent } from '../../../../services/player.service';
import { Chord } from './Chord/Chord';

export const IV_V_I_CADENCE_IN_C: NoteEvent[] = [
  {
    notes: new Chord('C').getVoicing(0),
    velocity: 0.3,
  },
  {
    notes: new Chord('F').getVoicing(2),
    velocity: 0.3,
  },
  {
    notes: new Chord('G').getVoicing(2),
    velocity: 0.3,
  },
  {
    notes: new Chord('C').getVoicing(1),
    duration: '2n',
    velocity: 0.3,
  }
]
