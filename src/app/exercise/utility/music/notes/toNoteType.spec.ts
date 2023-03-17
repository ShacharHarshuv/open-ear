import { getNoteType } from './getNoteType';

describe('toNoteType', function () {
  it('C4 is a C note', () => {
    expect(getNoteType('C4')).toEqual('C');
  });

  it('Bb3 is a Bb note', () => {
    expect(getNoteType('Bb3')).toEqual('Bb');
  });

  it('F#5 is an F# note', () => {
    expect(getNoteType('F#5')).toEqual('F#');
  });
});
