import { toSteadyPart } from './toSteadyPart';
import { NoteEvent } from '../../../services/player.service';
import { toArray } from '../../../shared/ts-utility/toArray';
import { toNoteNumber } from './notes/toNoteName';
import * as Tone from 'tone';

function assertNoteEvent(actual: NoteEvent, expected: NoteEvent): void {
  expect(toArray(actual.notes).map(toNoteNumber)).toEqual(
    toArray(actual.notes).map(toNoteNumber)
  );
  expect(Tone.Time(actual.time).toSeconds()).toEqual(
    Tone.Time(expected.time).toSeconds()
  );
  expect(Tone.Time(actual.duration).toSeconds()).toEqual(
    Tone.Time(expected.duration).toSeconds()
  );
}

function assertNoteEventList(actual: NoteEvent[], expected: NoteEvent[]): void {
  expect(actual.length).toEqual(expected.length);
  for (let i = 0; i < actual.length; i++) {
    assertNoteEvent(actual[i], expected[i]);
  }
}

describe('toSteadyPart', function () {
  it('Should work with a single note', () => {
    assertNoteEventList(toSteadyPart('C4'), [
      {
        notes: 'C4',
        time: 0,
        duration: '4n',
      },
    ]);
  });

  it('Should work with a single note number', () => {
    assertNoteEventList(toSteadyPart(60), [
      {
        notes: 'C4',
        time: 0,
        duration: '4n',
      },
    ]);
  });

  it('Should work with multiple notes', () => {
    assertNoteEventList(toSteadyPart(['C4', 'D4']), [
      {
        notes: 'C4',
        time: 0,
        duration: '4n',
      },
      {
        notes: 'D4',
        time: {
          '4n': 1,
        },
        duration: '4n',
      },
    ]);
  });

  it('Should work with multiple notes per beat', () => {
    assertNoteEventList(
      toSteadyPart([
        ['C4', 'E4'],
        ['D4', 'F4'],
      ]),
      [
        {
          notes: ['C4', 'E4'],
          time: 0,
          duration: '4n',
        },
        {
          notes: ['D4', 'F4'],
          time: {
            '4n': 1,
          },
          duration: '4n',
        },
      ]
    );
  });

  it('If got note events, it should return them without modification', () => {
    assertNoteEventList(
      toSteadyPart({
        notes: 'C4',
        time: 0,
        duration: '4n',
      }),
      [
        {
          notes: 'C4',
          time: 0,
          duration: '4n',
        },
      ]
    );
  });
});
