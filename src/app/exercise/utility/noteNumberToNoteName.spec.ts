import {
  noteNumberToNoteName,
  noteNameToNoteNumber
} from './noteNumberToNoteName';

describe('noteNumberToNoteName', function () {
  it('A0', () => {
    expect(noteNumberToNoteName(21)).toEqual('A0');
  });
  it('C4', () => {
    expect(noteNumberToNoteName(60)).toEqual('C4');
  });
  it('G9', () => {
    expect(noteNumberToNoteName(127)).toEqual('G9');
  });
});

describe('noteNameToNoteNumber', function () {
  it('A0', () => {
    expect(noteNameToNoteNumber('A0')).toEqual(21);
  });
  it('C4', () => {
    expect(noteNameToNoteNumber('C4')).toEqual(60);
  });
  it('G9', () => {
    expect(noteNameToNoteNumber('G9')).toEqual(127);
  })
});
