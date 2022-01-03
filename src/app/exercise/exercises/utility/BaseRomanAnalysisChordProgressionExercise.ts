import {
  BaseTonalChordProgressionExercise,
  BaseTonalChordProgressionExerciseSettings,
  ChordProgressionQuestion
} from './BaseTonalChordProgressionExercise';
import { Chord, TriadInversion } from '../../utility/music/chords';
import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { PlayAfterCorrectAnswerSetting } from './PlayAfterCorrectAnswerSetting';
import { Exercise } from '../../Exercise';
import { Interval, toArray, toNoteNumber, toSteadyPart } from '../../utility';
import { transpose } from '../../utility/music/transpose';

export type RomanNumeralChord = 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi' | 'viiᵒ';

export type BaseRomanAnalysisChordProgressionExerciseSettings =
  BaseTonalChordProgressionExerciseSettings<RomanNumeralChord> &
  PlayAfterCorrectAnswerSetting;

const chordsInC: { chord: Chord; answer: RomanNumeralChord }[] = [
  {
    chord: new Chord('C'),
    answer: 'I',
  },
  {
    chord: new Chord('Dm'),
    answer: 'ii',
  },
  {
    chord: new Chord('Em'),
    answer: 'iii',
  },
  {
    chord: new Chord('F'),
    answer: 'IV',
  },
  {
    chord: new Chord('G'),
    answer: 'V',
  },
  {
    chord: new Chord('Am'),
    answer: 'vi',
  },
  {
    chord: new Chord('Bdim'),
    answer: 'viiᵒ',
  },
];

const romanNumeralToChordInC: { [romanNumeral in RomanNumeralChord]?: Chord } = _.mapValues(_.keyBy(chordsInC, 'answer'), 'chord');

const romanNumeralToResolution: {
  [romanNumeral in RomanNumeralChord]: {
    [inversion in 0 | 1 | 2]: ReadonlyArray<{
      romanNumeral: RomanNumeralChord,
      voicingConfig: Omit<Parameters<Chord['getVoicing']>[0], 'withBass'>,
    }>;
  }
} = {
  I: {
    0: [],
    1: [],
    2: [
      {
        romanNumeral: 'I',
        voicingConfig: {topVoicesInversion: TriadInversion.Octave},
      },
    ],
  },
  ii: {
    0: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
    1: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        },
      },
    ],
    2: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
        },
      },
    ],
  },
  iii: {
    0: [
      {
        romanNumeral: 'IV',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
          octave: 5,
        },
      },
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
    1: [
      {
        romanNumeral: 'IV',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
        },
      },
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
          octave: 3,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        },
      },
    ],
    2: [
      {
        romanNumeral: 'IV',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
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
          topVoicesInversion: TriadInversion.Third,
          octave: 3,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {topVoicesInversion: TriadInversion.Octave},
      },
    ],
    1: [
      {
        romanNumeral: 'V',
        voicingConfig: {topVoicesInversion: TriadInversion.Fifth},
      },
      {
        romanNumeral: 'I',
        voicingConfig: {topVoicesInversion: TriadInversion.Octave},
      },
    ],
    2: [
      {
        romanNumeral: 'V',
        voicingConfig: {topVoicesInversion: TriadInversion.Third},
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
  },
  V: {
    0: [{
      romanNumeral: 'I',
      voicingConfig: {topVoicesInversion: TriadInversion.Octave},
    }],
    1: [{
      romanNumeral: 'I',
      voicingConfig: {
        topVoicesInversion: TriadInversion.Octave,
        octave: 5,
      },
    }],
    2: [{
      romanNumeral: 'I',
      voicingConfig: {
        topVoicesInversion: TriadInversion.Octave,
        octave: 5,
      },
    }],
  },
  vi: {
    0: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        },
      },
    ],
    1: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
    2: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
          octave: 3,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 4,
        },
      },
    ],
  },
  viiᵒ: {
    0: [
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
        }
      }
    ],
    1: [
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        }
      }
    ],
    2: [
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        }
      }
    ],
  }
};


export type RomanNumeralsChordProgressionQuestion = {
  chordProgressionInRomanAnalysis: RomanNumeralChord[]
};

export abstract class BaseRomanAnalysisChordProgressionExercise<GSettings extends BaseRomanAnalysisChordProgressionExerciseSettings> extends BaseTonalChordProgressionExercise<RomanNumeralChord, GSettings> {
  protected abstract _getChordProgressionInRomanNumerals(): RomanNumeralsChordProgressionQuestion;

  protected _getChordProgressionInC(): ChordProgressionQuestion<RomanNumeralChord> {
    const chordProgressionQuestion: RomanNumeralsChordProgressionQuestion = this._getChordProgressionInRomanNumerals();

    const question: ChordProgressionQuestion<RomanNumeralChord> = {
      segments: chordProgressionQuestion.chordProgressionInRomanAnalysis.map((romanNumeral): {
        chord: Chord,
        answer: RomanNumeralChord,
      } => ({
        chord: romanNumeralToChordInC[romanNumeral]!,
        answer: romanNumeral,
      })),
    };

    if (question.segments.length === 1 && this._settings.playAfterCorrectAnswer) {
      question.afterCorrectAnswer = ({firstChordInversion, questionSegments}) => {
        // calculate resolution
        const firstChordRomanNumeral: RomanNumeralChord = question.segments[0].answer;
        const resolution: {
          romanNumeral: RomanNumeralChord,
          chordVoicing: Note[],
        }[] = [
          {
            romanNumeral: firstChordRomanNumeral,
            chordVoicing: question.segments[0].chord.getVoicing({
              topVoicesInversion: firstChordInversion,
              withBass: this._settings.includeBass,
            }),
          },
          ...romanNumeralToResolution[firstChordRomanNumeral][firstChordInversion].map(chord => ({
            romanNumeral: chord.romanNumeral,
            chordVoicing: romanNumeralToChordInC[chord.romanNumeral]!.getVoicing({
              ...chord.voicingConfig,
              withBass: this._settings.includeBass,
            }),
          })),
        ];

        const differenceInOctavesToNormalize: number = _.round((toNoteNumber(toArray(toSteadyPart(questionSegments[0].partToPlay)[0].notes)[0]) - toNoteNumber(resolution[0].chordVoicing[0])) / Interval.Octave);

        return resolution.map(({
                                 romanNumeral,
                                 chordVoicing,
                               }, index) => ({
          answerToHighlight: romanNumeral,
          partToPlay: [{
            notes: chordVoicing.map(note => transpose(note, differenceInOctavesToNormalize * Interval.Octave)),
            duration: index === resolution.length - 1 ? '2n' : '4n',
            velocity: 0.3,
          }],
        }));
      };
    }

    return question;
  }

  /**
   * @override
   * */
  protected _getDefaultSettings(): GSettings {
    return {
      ...super._getDefaultSettings(),
      playAfterCorrectAnswer: false,
    };
  }

  protected _getAllAnswersList(): Exercise.AnswerList<RomanNumeralChord> {
    return {
      rows: [
        [
          'I',
          'ii',
          'iii',
          'IV',
          'V',
          'vi',
          'viiᵒ',
        ]
      ]
    }
  }
}
