import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from './NoteType';
import { getNoteType } from './getNoteType';
import { toNoteTypeNumber } from './toNoteTypeNumber';

export function noteOfType(
  noteType: NoteType,
): jasmine.AsymmetricMatcher<Note> {
  return {
    asymmetricMatch(
      note: Note,
      customTesters: ReadonlyArray<jasmine.CustomEqualityTester>,
    ): boolean {
      return toNoteTypeNumber(getNoteType(note)) === toNoteTypeNumber(noteType);
    },
    jasmineToString(): string {
      return 'note of type ' + noteType;
    },
  };
}
