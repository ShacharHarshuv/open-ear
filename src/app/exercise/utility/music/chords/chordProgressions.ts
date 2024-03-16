import { NoteEvent } from '../../../../services/player.service';
import { Chord, TriadPosition } from './Chord/Chord';

export const IV_V_I_CADENCE_IN_C: NoteEvent[] = [
  {
    notes: new Chord('C').getVoicing({
      position: TriadPosition.Fifth,
    }),
    velocity: 0.3,
  },
  {
    notes: new Chord('F').getVoicing({
      position: TriadPosition.Third,
    }),
    velocity: 0.3,
  },
  {
    notes: new Chord('G').getVoicing({
      position: TriadPosition.Third,
    }),
    velocity: 0.3,
  },
  {
    notes: new Chord('C').getVoicing({
      position: TriadPosition.Octave,
      octave: 5,
    }),
    duration: '2n',
    velocity: 0.3,
  },
];

export const iv_V_i_CADENCE_IN_C: NoteEvent[] = [
  {
    notes: new Chord('Cm').getVoicing({
      position: TriadPosition.Fifth,
    }),
    velocity: 0.3,
  },
  {
    notes: new Chord('Fm').getVoicing({
      position: TriadPosition.Third,
    }),
    velocity: 0.3,
  },
  {
    notes: new Chord('G').getVoicing({
      position: TriadPosition.Third,
    }),
    velocity: 0.3,
  },
  {
    notes: new Chord('Cm').getVoicing({
      position: TriadPosition.Octave,
      octave: 5,
    }),
    duration: '2n',
    velocity: 0.3,
  },
];
