import { NoteEvent } from '../../../../services/player.service';
import {
  Chord,
  TriadInversion
} from './Chord/Chord';

export const IV_V_I_CADENCE_IN_C: NoteEvent[] = [
  {
    notes: new Chord('C').getVoicing(TriadInversion.Fifth),
    velocity: 0.3,
  },
  {
    notes: new Chord('F').getVoicing(TriadInversion.Third),
    velocity: 0.3,
  },
  {
    notes: new Chord('G').getVoicing(TriadInversion.Third),
    velocity: 0.3,
  },
  {
    notes: new Chord('C').getVoicing(TriadInversion.Octave),
    duration: '2n',
    velocity: 0.3,
  }
]
