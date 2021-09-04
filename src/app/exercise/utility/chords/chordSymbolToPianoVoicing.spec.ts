import { toNoteNumber } from '../toNoteName';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { chordSymbolToPianoVoicing } from './chordSymbolToPianoVoicing';

describe('Chord symbol to piano voicing', () => {
  describe('major chords', function () {
    describe('C', function () {
      it('5th position', () => {
        const expectedResult: Note[] = ['C2', 'C3', 'C4', 'E4', 'G4'];
        expect(chordSymbolToPianoVoicing('C', '5th').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });

      it('3rd position', () => {
        const expectedResult: Note[] = ['C2', 'C3', 'G4', 'C5', 'E5'];
        expect(chordSymbolToPianoVoicing('C', '3rd').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });

      it('8th position', () => {
        const expectedResult: Note[] = ['C2', 'C3', 'E4', 'G4', 'C5'];
        expect(chordSymbolToPianoVoicing('C', '8th').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });
    });

    describe('Ab', function () {
      it('5th position', () => {
        const expectedResult: Note[] = ['Ab1', 'Ab2', 'Ab3', 'C4', 'Eb4'];
        expect(chordSymbolToPianoVoicing('Ab', '5th').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });

      it('3rd position', () => {
        const expectedResult: Note[] = ['Ab1', 'Ab2', 'Eb4', 'Ab4', 'C5'];
        expect(chordSymbolToPianoVoicing('Ab', '3rd').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });

      it('8th position', () => {
        const expectedResult: Note[] = ['Ab1', 'Ab2', 'C4', 'Eb4', 'Ab4'];
        expect(chordSymbolToPianoVoicing('Ab', '8th').map(toNoteNumber)).toEqual(expectedResult.map(toNoteNumber));
      });
    });
  });
})
