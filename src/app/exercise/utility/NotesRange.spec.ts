import { NotesRange } from './NotesRange';
import { toNoteNumber } from './toNoteName';
import { Note } from 'tone/Tone/core/type/NoteUnits';

describe('Range', function () {
  it('range constructor', () => {
    const range = new NotesRange({
      lowestNote: 'C4',
      highestNote: 'C5',
    });
    expect(range.lowestNoteName).toEqual('C4');
    expect(range.highestNoteName).toEqual('C5');
  });

  it('lowest and highest notes constructor', () => {
    const range = new NotesRange('C4', 'C5');
    expect(range.lowestNoteName).toEqual('C4');
    expect(range.highestNoteName).toEqual('C5');
  });

  it('Should fail lowest note is higher then highest note', () => {
    expect(() => {
      new NotesRange('C5', 'C4')
    }).toThrow();
  });

  it('Range size', () => {
    const range = new NotesRange('C4', 'C5');
    expect(range.rangeSizeInSemitones).toEqual(12);
  });

  describe('is note in range', () => {
    let range: NotesRange;
    beforeEach(() => {
      range = new NotesRange('C4', 'C5');
    });

    it('in range', () => {
      expect(range.isInRange('D4')).toBeTrue();
    });

    it('not in range', () => {
      expect(range.isInRange('F3')).toBeFalse();
    });
  });

  describe('getAllNotes', () => {
    it('without key', () => {
      const range = new NotesRange('Bb3', 'G#4');
      const expectedNotesInRange: Note[] = ['Bb3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4'];
      const result: Note[] = range.getAllNotes();
      console.log(result);
      expect(result.map(toNoteNumber)).toEqual(expectedNotesInRange.map(toNoteNumber));
    })

    it('with key', () => {
      const range = new NotesRange('Bb3', 'G#4');
      const expectedNotesInRange: Note[] = ['Bb3', 'C4', 'D4', 'Eb4', 'F4', 'G4'];
      expect(range.getAllNotes('Bb').map(toNoteNumber)).toEqual(expectedNotesInRange.map(toNoteNumber));
    })
  });
});
