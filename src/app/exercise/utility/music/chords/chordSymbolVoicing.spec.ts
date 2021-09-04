import { toNoteNumber } from '../notes/toNoteName';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { chordSymbolVoicing } from './chordSymbolVoicing';

describe('Chord symbol to piano voicing', () => {
  describe('major chords', function () {
    describe('C', function () {
      it('5th position', () => {
        const expectedResult: Note[] = ['C4', 'E4', 'G4'];
        expect(chordSymbolVoicing('C', '5th').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });

      it('3rd position', () => {
        const expectedResult: Note[] = ['G4', 'C5', 'E5'];
        expect(chordSymbolVoicing('C', '3rd').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });

      it('8th position', () => {
        const expectedResult: Note[] = ['E4', 'G4', 'C5'];
        expect(chordSymbolVoicing('C', '8th').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });
    });

    describe('Ab', function () {
      it('5th position', () => {
        const expectedResult: Note[] = ['Ab3', 'C4', 'Eb4'];
        expect(chordSymbolVoicing('Ab', '5th').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });

      it('3rd position', () => {
        const expectedResult: Note[] = ['Eb4', 'Ab4', 'C5'];
        expect(chordSymbolVoicing('Ab', '3rd').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });

      it('8th position', () => {
        const expectedResult: Note[] = ['C4', 'Eb4', 'Ab4'];
        expect(chordSymbolVoicing('Ab', '8th').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });
    });
  });
})
