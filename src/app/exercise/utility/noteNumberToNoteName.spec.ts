import {
  toNoteName,
  toNoteNumber
} from './toNoteName';

describe('noteNumberToNoteName', function () {
  it('A0', () => {
    expect(toNoteName(21)).toEqual('A0');
  });
  it('C4', () => {
    expect(toNoteName(60)).toEqual('C4');
  });
  it('G9', () => {
    expect(toNoteName(127)).toEqual('G9');
  });
  it('Note name as input', () => {
    expect(toNoteName('C4')).toEqual('C4');
  })
});

describe('noteNameToNoteNumber', function () {
  it('A0', () => {
    expect(toNoteNumber('A0')).toEqual(21);
  });
  it('C4', () => {
    expect(toNoteNumber('C4')).toEqual(60);
  });
  it('G9', () => {
    expect(toNoteNumber('G9')).toEqual(127);
  })
  it('Note number as input', () => {
    expect(toNoteNumber(60)).toEqual(60);
  })
});
