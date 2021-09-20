import { NoteEvent } from '../../../../services/player.service';
import {
  Chord,
  TriadInversion
} from './Chord/Chord';

export const IV_V_I_CADENCE_IN_C: NoteEvent[] = [
  {
    notes: new Chord('C').getVoicing({topVoicesInversion: TriadInversion.Fifth}),
    velocity: 0.3,
  },
  {
    notes: new Chord('F').getVoicing({topVoicesInversion: TriadInversion.Third}),
    velocity: 0.3,
  },
  {
    notes: new Chord('G').getVoicing({topVoicesInversion: TriadInversion.Third}),
    velocity: 0.3,
  },
  {
    notes: new Chord('C').getVoicing({topVoicesInversion: TriadInversion.Octave, octave: 5}),
    duration: '2n',
    velocity: 0.3,
  }
]
