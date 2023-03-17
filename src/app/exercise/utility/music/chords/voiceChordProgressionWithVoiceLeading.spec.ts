import { voiceChordProgressionWithVoiceLeading } from "./voiceChordProgressionWithVoiceLeading";
import { ChordSymbol } from "./Chord/Chord";
import { Note } from "tone/Tone/core/type/NoteUnits";
import { toNoteNumber } from "../notes/toNoteName";
import * as _ from "lodash";
import Spy = jasmine.Spy;

describe('voiceChordProgressionWithVoiceLeading', function () {
  const testCases: {
    force?: true;
    progression: ChordSymbol[];
    startingInversion: number;
    expectedResultsOptions: {
      randomlyChosenIndexesList: number[];
      expectedResult: Note[][] | null;
    }[];
  }[] = [
    {
      progression: ['C', 'F', 'G', 'C'],
      startingInversion: 0,
      expectedResultsOptions: [
        {
          randomlyChosenIndexesList: [0, 0, 0],
          expectedResult: [
            ['C2', 'C3', 'C4', 'E4', 'G4'],
            ['F2', 'F3', 'C4', 'F4', 'A4'],
            ['G2', 'G3', 'B3', 'D4', 'G4'],
            ['C2', 'C3', 'C4', 'E4', 'G4'],
          ],
        },
      ],
    },
    {
      progression: ['C', 'F', 'G', 'C'],
      startingInversion: 1,
      expectedResultsOptions: [
        {
          randomlyChosenIndexesList: [0, 0, 0],
          expectedResult: [
            ['C2', 'C3', 'E3', 'G3', 'C4'],
            ['F2', 'F3', 'F3', 'A3', 'C4'],
            ['G2', 'G3', 'G3', 'B3', 'D4'],
            ['C2', 'C3', 'G3', 'C4', 'E4'],
          ],
        },
      ],
    },
    {
      progression: ['F', 'G'],
      startingInversion: 2,
      expectedResultsOptions: [
        {
          randomlyChosenIndexesList: [0],
          expectedResult: [
            ['F2', 'F3', 'C4', 'F4', 'A4'],
            ['G2', 'G3', 'B3', 'D4', 'G4'],
          ],
        },
        {
          randomlyChosenIndexesList: [1],
          expectedResult: [
            ['F2', 'F3', 'C4', 'F4', 'A4'],
            ['G2', 'G3', 'D4', 'G4', 'B4'],
          ],
        },
      ],
    },
    {
      progression: ['C', 'F'],
      startingInversion: 0,
      expectedResultsOptions: [
        {
          randomlyChosenIndexesList: [0],
          expectedResult: [
            ['C2', 'C3', 'C4', 'E4', 'G4'],
            ['F2', 'F3', 'C4', 'F4', 'A4'],
          ],
        },
        {
          randomlyChosenIndexesList: [1],
          expectedResult: null,
        },
      ],
    },
    {
      progression: ['C', 'G'],
      startingInversion: 1,
      expectedResultsOptions: [
        {
          randomlyChosenIndexesList: [0],
          expectedResult: [
            ['C2', 'C3', 'E3', 'G3', 'C4'],
            ['G2', 'G3', 'D3', 'G3', 'B3'],
          ],
        },
      ],
    },
    {
      progression: ['C', 'Fmaj7'],
      startingInversion: 0,
      expectedResultsOptions: [
        {
          randomlyChosenIndexesList: [1],
          expectedResult: [
            ['C2', 'C3', 'C4', 'E4', 'G4'],
            ['F2', 'F3', 'C4', 'E4', 'F4', 'A4'],
          ],
        },
      ],
    },
    {
      progression: ['Fmaj7', 'C'],
      startingInversion: 0,
      expectedResultsOptions: [
        {
          randomlyChosenIndexesList: [1],
          expectedResult: [
            ['F2', 'F3', 'F3', 'A3', 'C4', 'E4'],
            ['C2', 'C3', 'G3', 'C4', 'E4'],
          ],
        },
      ],
    },
    {
      progression: ['F#maj7', 'Fmaj7', 'Ab'],
      startingInversion: 0,
      expectedResultsOptions: [
        {
          randomlyChosenIndexesList: [1, 0],
          expectedResult: [
            ['F#2', 'F#3', 'F#3', 'A#3', 'C#4', 'F4'],
            ['F2', 'F3', 'A3', 'C4', 'E4', 'F4'],
            ['Ab2', 'Ab3', 'G#3', 'C4', 'D#4'],
          ],
        },
      ],
    },
  ];

  let spy: Spy;

  beforeEach(() => {
    spy = spyOn<any>(_, 'random');
  });

  testCases.forEach((testCase) => {
    (testCase.force ? fdescribe : describe)(
      `Voicing of ${testCase.progression.join(', ')} starting with ${
        testCase.startingInversion
      }`,
      () => {
        testCase.expectedResultsOptions.forEach((voicingOption, index) => {
          it(`Option ${index++}`, () => {
            spy.and.returnValues(...voicingOption.randomlyChosenIndexesList);
            if (!!voicingOption.expectedResult) {
              const result: Note[][] = voiceChordProgressionWithVoiceLeading(
                testCase.progression,
                testCase.startingInversion
              );
              expect(result.map((chord) => chord.map(toNoteNumber))).toEqual(
                voicingOption.expectedResult.map((chord) =>
                  chord.map(toNoteNumber)
                )
              );
            } else {
              expect(() =>
                voiceChordProgressionWithVoiceLeading(
                  testCase.progression,
                  testCase.startingInversion
                )
              ).toThrow();
            }
          });
        });
      }
    );
  });
});
