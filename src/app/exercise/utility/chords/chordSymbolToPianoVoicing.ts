import { ChordSymbol } from './ChordSymbol';
import { ChordPosition } from './ChordPosition';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from '../NoteType';
import { ChordType } from './ChordType';
import { transpose } from '../transpose';
import { getDistanceOfKeys } from '../getDistanceOfKeys';

const chordTypeToVoicingsInC: {[chordType in ChordType]: {[position in ChordPosition]: Note[]}} = {
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

export function chordSymbolToPianoVoicing(chordSymbol: ChordSymbol, position: ChordPosition): Note[] {
  const chordRootNote: NoteType = chordSymbol.match(/^[A-G](?:#|b|)/)?.[0] as NoteType;
  const chordType: ChordType = chordSymbol.includes('m') ? 'm' : 'M';
  const distanceOfRootNoteFromC = getDistanceOfKeys(chordRootNote, 'C');
  return transpose([
    'C2',
    'C3',
    ...chordTypeToVoicingsInC[chordType][position]
  ], distanceOfRootNoteFromC > 7 ? distanceOfRootNoteFromC - 12 : distanceOfRootNoteFromC);
}
