import { voiceChordProgression } from './voiceChordProgression';
import { ChordSymbol } from './Chord/Chord';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { toNoteNumber } from '../notes/toNoteName';

describe('voiceChordProgression', function () {
  const testCases: [[ChordSymbol[], number], Note[][]][] = [
    [
      [['C', 'F', 'G', 'C'], 0],
      [
        ['C2', 'C3', 'C4', 'E4', 'G4'],
        ['F2', 'F3', 'C4', 'F4', 'A4'],
        ['G2', 'G3', 'B3', 'D4', 'G4'],
        ['C2', 'C3', 'C4', 'E4', 'G4'],
      ],
    ],
    [
      [['C', 'F', 'G', 'C'], 1],
      [
        ['C2', 'C3', 'E4', 'G4', 'C5'],
        ['F2', 'F3', 'F4', 'A4', 'C5'],
        ['G2', 'G3', 'G4', 'B4', 'D5'],
        ['C2', 'C3', 'G4', 'C5', 'E5'],
      ],
    ]
  ]

  testCases.forEach(([[chordSymbolList, startingInversion], voicing]) => {
    it(`Voicing of ${chordSymbolList.join(', ')}`, () => {
      const result: Note[][] = voiceChordProgression(chordSymbolList, startingInversion);
      expect(result.map(chord => chord.map(toNoteNumber))).toEqual(voicing.map(chord => chord.map(toNoteNumber)))
    })
  })
});
