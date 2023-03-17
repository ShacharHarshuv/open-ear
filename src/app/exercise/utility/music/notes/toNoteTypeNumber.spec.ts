import { NoteType } from './NoteType';
import { toNoteTypeNumber, toNoteTypeName } from './toNoteTypeNumber';

describe('toNoteTypeNumber', function () {
  const testCases: [NoteType | number, number][] = [
    ['C', 0],
    ['C#', 1],
    ['Db', 1],
    ['G', 7],
    ['Bb', 10],
    ['B', 11],
    [2, 2],
    [11, 11],
  ];
  testCases.forEach(([noteTypeOrNumber, noteTypeNumber]) => {
    it(`The note type number of ${noteTypeOrNumber} is ${noteTypeNumber}`, () => {
      expect(toNoteTypeNumber(noteTypeNumber)).toEqual(noteTypeNumber);
    });
  });
});

describe('toNoteTypeName', function () {
  const testCases: [NoteType | number, NoteType][] = [
    [0, 'C'],
    [1, 'C#'],
    [7, 'G'],
    [10, 'A#'],
    [11, 'B'],
    ['D#', 'D#'],
    ['B', 'B'],
  ];
  testCases.forEach(([noteTypeOrNumber, noteType]) => {
    it(`The note type of ${noteTypeOrNumber} is ${noteType}`, () => {
      expect(toNoteTypeName(noteTypeOrNumber)).toEqual(noteType);
    });
  });
});
