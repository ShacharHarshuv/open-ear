import { NotesRange } from './NotesRange';

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
  })
});
