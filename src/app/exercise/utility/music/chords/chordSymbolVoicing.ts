import { ChordPosition } from './ChordPosition';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from '../notes/NoteType';
import { transpose } from '../transpose';
import { getDistanceOfKeys } from '../keys/getDistanceOfKeys';
import {
  ChordType,
  ChordSymbol,
  Chord
} from './Chord/Chord';

const chordTypeToVoicingsInC: { [chordType in ChordType]: { [position in ChordPosition]: Note[] } } = {
  M: {
    '5th': ['C4', 'E4', 'G4'],
    '3rd': ['G4', 'C5', 'E5'],
    '8th': ['E4', 'G4', 'C5'],
  },
  m: {
    '5th': ['C4', 'Eb4', 'G4'],
    '3rd': ['G4', 'C5', 'Eb5'],
    '8th': ['Eb4', 'G4', 'C5'],
  }
}

/**
 * This will work without the bass note
 * */
// todo: rewrite this function so it uses chordSymbolToNoteTypes and supports any inversion (no matter the number of notes)
export function chordSymbolVoicing(chordSymbol: ChordSymbol, inversion: ChordPosition): Note[] {
  const chordRootNote: NoteType = new Chord(chordSymbol).root;
  const chordType: ChordType = chordSymbol.includes('m') ? 'm' : 'M';
  const distanceOfRootNoteFromC = getDistanceOfKeys(chordRootNote, 'C');
  return transpose(chordTypeToVoicingsInC[chordType][inversion], distanceOfRootNoteFromC > 7 ? distanceOfRootNoteFromC - 12 : distanceOfRootNoteFromC);
}
