import { noteToNoteType } from './noteToNoteType';

describe('noteToNoteType', function () {
  it('C4 is a C note', () => {
    expect(noteToNoteType('C4')).toEqual('C');
  });

  it('Bb3 is a Bb note', () => {
    expect(noteToNoteType('Bb3')).toEqual('Bb');
  });

  it('F#5 is an F# note', () => {
    expect(noteToNoteType('F#5')).toEqual('F#');
  });
});
