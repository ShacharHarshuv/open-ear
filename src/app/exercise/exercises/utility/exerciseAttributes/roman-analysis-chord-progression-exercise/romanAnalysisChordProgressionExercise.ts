import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import Exercise from '../../../../exercise-logic';
import {
  Interval,
  RomanNumeralChordSymbol,
  toArray,
  toNoteNumber,
  toSteadyPart,
} from '../../../../utility';
import { Chord, TriadPosition } from '../../../../utility/music/chords';
import { romanNumeralToChordInC } from '../../../../utility/music/harmony/romanNumeralToChordInC';
import { transpose } from '../../../../utility/music/transpose';
import { PlayAfterCorrectAnswerSetting } from '../../settings/PlayAfterCorrectAnswerSetting';
import { withSettings } from '../../settings/withSettings';
import {
  ChordProgressionExerciseConfig,
  ChordProgressionQuestion,
  VoicingSettings,
  chordProgressionExercise,
} from '../chordProgressionExercise';
import { composeExercise } from '../composeExercise';
import { TonalExerciseSettings, tonalExercise } from '../tonalExercise';
import { allRomanNumeralAnswerList } from './roman-numeral-answer-list';

export type RomanAnalysisChordProgressionExerciseSettings =
  TonalExerciseSettings &
    VoicingSettings<RomanNumeralChordSymbol> &
    PlayAfterCorrectAnswerSetting;

const romanNumeralToResolution: {
  [scale in 'minor' | 'major']?: {
    [romanNumeral in RomanNumeralChordSymbol]?: {
      [inversion in 0 | 1 | 2]: ReadonlyArray<{
        romanNumeral: RomanNumeralChordSymbol;
        voicingConfig: Omit<Parameters<Chord['getVoicing']>[0], 'withBass'>;
      }>;
    };
  };
} = {
  major: {
    I: {
      0: [],
      1: [],
      2: [
        {
          romanNumeral: 'I',
          voicingConfig: { position: TriadPosition.Octave },
        },
      ],
    },
    ii: {
      0: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Fifth,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Fifth,
          },
        },
      ],
    },
    iii: {
      0: [
        {
          romanNumeral: 'IV',
          voicingConfig: {
            position: TriadPosition.Fifth,
            octave: 5,
          },
        },
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'IV',
          voicingConfig: {
            position: TriadPosition.Fifth,
          },
        },
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
            octave: 3,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'IV',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
    },
    IV: {
      0: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
            octave: 3,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: { position: TriadPosition.Octave },
        },
      ],
      1: [
        {
          romanNumeral: 'V',
          voicingConfig: { position: TriadPosition.Fifth },
        },
        {
          romanNumeral: 'I',
          voicingConfig: { position: TriadPosition.Octave },
        },
      ],
      2: [
        {
          romanNumeral: 'V',
          voicingConfig: { position: TriadPosition.Third },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
    },
    V: {
      0: [
        {
          romanNumeral: 'I',
          voicingConfig: { position: TriadPosition.Octave },
        },
      ],
      1: [
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
    },
    vi: {
      0: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Fifth,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
            octave: 3,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 4,
          },
        },
      ],
    },
    viidim: {
      0: [
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Fifth,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
    },
  },
  minor: {
    i: {
      0: [],
      1: [],
      2: [
        {
          romanNumeral: 'i',
          voicingConfig: { position: TriadPosition.Octave },
        },
      ],
    },
    iidim: {
      0: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Fifth,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
      ],
    },
    bIII: {
      0: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
            octave: 3,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
    },
    iv: {
      0: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
            octave: 3,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'V',
          voicingConfig: { position: TriadPosition.Fifth },
        },
        {
          romanNumeral: 'i',
          voicingConfig: { position: TriadPosition.Octave },
        },
      ],
      2: [
        {
          romanNumeral: 'V',
          voicingConfig: { position: TriadPosition.Third },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
    },
    v: {
      0: [
        {
          romanNumeral: 'bVI',
          voicingConfig: {
            position: TriadPosition.Fifth,
          },
        },
        {
          romanNumeral: 'bVII',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'bVI',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'bVII',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 1,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'IV',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'V',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'I',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
    },
    V: {
      0: [
        {
          romanNumeral: 'i',
          voicingConfig: { position: TriadPosition.Octave },
        },
      ],
      1: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Fifth,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
    },
    bVI: {
      0: [
        {
          romanNumeral: 'bVII',
          voicingConfig: {
            position: TriadPosition.Third,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'bVII',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'bVII',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
    },
    bVII: {
      0: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Fifth,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
            octave: 5,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            position: TriadPosition.Octave,
          },
        },
      ],
    },
  },
};

export type RomanNumeralsChordProgressionQuestion = {
  chordProgressionInRomanAnalysis: RomanNumeralChordSymbol[];
};

export function romanAnalysisChordProgressionExercise<
  GSettings extends Exercise.Settings,
>(config?: ChordProgressionExerciseConfig) {
  return function (p: {
    getChordProgressionInRomanNumerals(
      settings: GSettings,
    ): RomanNumeralsChordProgressionQuestion;
  }) {
    return composeExercise(
      chordProgressionExercise(config),
      tonalExercise({
        cadenceTypeSelection: false,
      }),
      withSettings({
        defaultSettings: {
          playAfterCorrectAnswer: false,
        },
      }),
    )({
      getChordProgression(
        settings: RomanAnalysisChordProgressionExerciseSettings & GSettings,
      ): ChordProgressionQuestion<RomanNumeralChordSymbol> {
        const chordProgressionQuestion: RomanNumeralsChordProgressionQuestion =
          p.getChordProgressionInRomanNumerals(settings);

        const question: ChordProgressionQuestion<RomanNumeralChordSymbol> = {
          segments:
            chordProgressionQuestion.chordProgressionInRomanAnalysis.map(
              (
                romanNumeralSymbol,
              ): {
                chord: Chord;
                answer: RomanNumeralChordSymbol;
              } => {
                return {
                  chord: romanNumeralToChordInC(romanNumeralSymbol),
                  answer: romanNumeralSymbol,
                };
              },
            ),
        };

        if (question.segments.length === 1 && settings.playAfterCorrectAnswer) {
          // calculate resolution
          const firstChordRomanNumeral: RomanNumeralChordSymbol =
            question.segments[0].answer;
          const scaleForResolution = {
            'I IV V I': 'major',
            'i iv V i': 'minor',
          }[settings.cadenceType];
          const resolutionConfig =
            romanNumeralToResolution[scaleForResolution]?.[
              firstChordRomanNumeral
            ];
          if (resolutionConfig) {
            question.afterCorrectAnswer = ({
              firstChordInversion,
              questionSegments,
            }) => {
              const resolution:
                | {
                    romanNumeral: RomanNumeralChordSymbol;
                    chordVoicing: Note[];
                  }[]
                | null = [
                {
                  romanNumeral: firstChordRomanNumeral,
                  chordVoicing: question.segments[0].chord.getVoicing({
                    position: firstChordInversion,
                    withBass: settings.includeBass,
                  }),
                },
                ...resolutionConfig[firstChordInversion].map((chord) => ({
                  romanNumeral: chord.romanNumeral,
                  chordVoicing: romanNumeralToChordInC(
                    chord.romanNumeral,
                  )!.getVoicing({
                    ...chord.voicingConfig,
                    withBass: settings.includeBass,
                  }),
                })),
              ];

              const differenceInOctavesToNormalize: number = _.round(
                (toNoteNumber(
                  toArray(
                    toSteadyPart(questionSegments[0].partToPlay)[0].notes,
                  )[0],
                ) -
                  toNoteNumber(resolution[0].chordVoicing[0])) /
                  Interval.Octave,
              );

              return resolution.map(
                ({ romanNumeral, chordVoicing }, index) => ({
                  answerToHighlight: romanNumeral,
                  partToPlay: [
                    {
                      notes: chordVoicing.map((note) =>
                        transpose(
                          note,
                          differenceInOctavesToNormalize * Interval.Octave,
                        ),
                      ),
                      duration: index === resolution.length - 1 ? '2n' : '4n',
                      velocity: 0.3,
                    },
                  ],
                }),
              );
            };
          }
        }

        return question;
      },
      answerList: allRomanNumeralAnswerList,
    });
  };
}
