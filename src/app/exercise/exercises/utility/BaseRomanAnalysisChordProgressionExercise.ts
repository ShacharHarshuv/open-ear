import {
  BaseTonalChordProgressionExercise,
  BaseTonalChordProgressionExerciseSettings,
  ChordProgressionQuestion
} from './BaseTonalChordProgressionExercise';
import { Chord, ChordSymbol, TriadInversion } from '../../utility/music/chords';
import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { PlayAfterCorrectAnswerSetting } from './PlayAfterCorrectAnswerSetting';
import { Exercise } from '../../Exercise';
import { Interval, toArray, toNoteNumber, toSteadyPart } from '../../utility';
import { transpose } from '../../utility/music/transpose';
import { NoteEvent } from '../../../services/player.service';

export type RomanNumeralChord =
  | 'II' | 'III' | '#IVᵒ' | 'VI' | 'VII'
  | 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi' | 'viiᵒ'
  | 'i' | 'iiᵒ' | '♭III' | 'iv' | 'v' | '♭VI' | '♭VII'
  | '♭II' | 'vᵒ' | '♭vii';

export type BaseRomanAnalysisChordProgressionExerciseSettings =
  BaseTonalChordProgressionExerciseSettings<RomanNumeralChord> &
  PlayAfterCorrectAnswerSetting;

const chordsInC: { chord: ChordSymbol; answer: RomanNumeralChord }[] = [
  {
    chord: 'D',
    answer: 'II',
  },
  {
    chord: 'E',
    answer: 'III',
  },
  {
    chord: 'F#dim',
    answer: '#IVᵒ',
  },
  {
    chord: 'A',
    answer: 'VI',
  },
  {
    chord: 'B',
    answer: 'VII',
  },
  {
    chord: 'C',
    answer: 'I',
  },
  {
    chord: 'Dm',
    answer: 'ii',
  },
  {
    chord: 'Em',
    answer: 'iii',
  },
  {
    chord: 'F',
    answer: 'IV',
  },
  {
    chord: 'G',
    answer: 'V',
  },
  {
    chord: 'Am',
    answer: 'vi',
  },
  {
    chord: 'Bdim',
    answer: 'viiᵒ',
  },
  {
    chord: 'Cm',
    answer: 'i',
  },
  {
    chord: 'Ddim',
    answer: 'iiᵒ',
  },
  {
    chord: 'Eb',
    answer: '♭III',
  },
  {
    chord: 'Fm',
    answer: 'iv',
  },
  {
    chord: 'Gm',
    answer: 'v',
  },
  {
    chord: 'Ab',
    answer: '♭VI'
  },
  {
    chord: 'Bb',
    answer: '♭VII'
  },
  {
    chord: 'Db',
    answer: '♭II',
  },
  {
    chord: 'Gdim',
    answer: 'vᵒ',
  },
  {
    chord: 'Bbm',
    answer: '♭vii',
  }
];

export const romanNumeralToChordInC: { [romanNumeral in RomanNumeralChord]?: Chord } = _.mapValues(_.keyBy(chordsInC, 'answer'), chordDescriptor => new Chord(chordDescriptor.chord));

const romanNumeralToResolution: {
  [scale in 'MINOR' | 'MAJOR']?: {
    [romanNumeral in RomanNumeralChord]?: {
      [inversion in 0 | 1 | 2]: ReadonlyArray<{
        romanNumeral: RomanNumeralChord,
        voicingConfig: Omit<Parameters<Chord['getVoicing']>[0], 'withBass'>,
      }>;
    }
  }
} = {
  MAJOR: {
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
          romanNumeral: 'I',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Fifth,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'I',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'I',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Third,
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
  },
  MINOR: {
    i: {
      0: [],
      1: [],
      2: [
        {
          romanNumeral: 'i',
          voicingConfig: {topVoicesInversion: TriadInversion.Octave},
        },
      ],
    },
    iiᵒ: {
      0: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Fifth,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Third,
          },
        },
      ],
    },
    '♭III': {
      0: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Third,
          },
        },
        {
          romanNumeral: 'i',
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
            topVoicesInversion: TriadInversion.Third,
            octave: 3,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
          },
        },
      ],
      2: [
        {
          romanNumeral: 'V',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Third,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
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
            topVoicesInversion: TriadInversion.Third,
            octave: 3,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
          },
        },
      ],
      1: [
        {
          romanNumeral: 'V',
          voicingConfig: {topVoicesInversion: TriadInversion.Fifth},
        },
        {
          romanNumeral: 'i',
          voicingConfig: {topVoicesInversion: TriadInversion.Octave},
        },
      ],
      2: [
        {
          romanNumeral: 'V',
          voicingConfig: {topVoicesInversion: TriadInversion.Third},
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
            octave: 5,
          },
        },
      ],
    },
    V: {
      0: [{
        romanNumeral: 'i',
        voicingConfig: {topVoicesInversion: TriadInversion.Octave},
      }],
      1: [{
        romanNumeral: 'i',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
        },
      }],
      2: [{
        romanNumeral: 'i',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      }],
    },
    '♭VI': {
      0: [
        {
          romanNumeral: '♭VII',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Third,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
          },
        },
      ],
      1: [
        {
          romanNumeral: '♭VII',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
            octave: 5,
          },
        },
      ],
      2: [
        {
          romanNumeral: '♭VII',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
          },
        },
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
            octave: 5,
          },
        },
      ],
    },
    '♭VII': {
      0: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Fifth,
          }
        }
      ],
      1: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
            octave: 5,
          }
        }
      ],
      2: [
        {
          romanNumeral: 'i',
          voicingConfig: {
            topVoicesInversion: TriadInversion.Octave,
          }
        }
      ],
    }
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
      // calculate resolution
      const firstChordRomanNumeral: RomanNumeralChord = question.segments[0].answer;
      const scaleForResolution = {
        'I IV V I': 'MAJOR',
        'i iv V i': 'MINOR',
      }[this._settings.cadenceType];
      const resolutionConfig = romanNumeralToResolution[scaleForResolution]?.[firstChordRomanNumeral];
      if (resolutionConfig) {
        question.afterCorrectAnswer = ({firstChordInversion, questionSegments}) => {
          const resolution: {
            romanNumeral: RomanNumeralChord,
            chordVoicing: Note[],
          }[] | null = [
            {
              romanNumeral: firstChordRomanNumeral,
              chordVoicing: question.segments[0].chord.getVoicing({
                topVoicesInversion: firstChordInversion,
                withBass: this._settings.includeBass,
              }),
            },
            ...resolutionConfig[firstChordInversion].map(chord => ({
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
    }

    return question;
  }

  protected override _getDefaultSettings(): GSettings {
    return {
      ...super._getDefaultSettings(),
      playAfterCorrectAnswer: false,
    };
  }

  protected _getAllAnswersListInC(): Exercise.AnswerList<RomanNumeralChord> {
    function getPlayOnClickPart(chord: Chord): NoteEvent[] {
      return [{
        notes: chord.getVoicing({topVoicesInversion: TriadInversion.Fifth}),
        velocity: 0.3,
        duration: '2n',
      }];
    }

    const answerList: { rows: (Exercise.AnswerConfig<RomanNumeralChord> | RomanNumeralChord)[][] } = {
      rows: [
        [
          {
            answer: null,
            space: 1,
          },
          'II',
          'III',
          '#IVᵒ',
          {
            answer: null,
            space: 1,
          },
          'VI',
          'VII',
        ],
        [
          'I',
          'ii',
          'iii',
          'IV',
          'V',
          'vi',
          'viiᵒ',
        ],
        [
          'i',
          'iiᵒ',
          '♭III',
          'iv',
          'v',
          '♭VI',
          '♭VII',
        ],
        [
          {
            answer: null,
            space: 1,
          },
          '♭II',
          {
            answer: null,
            space: 1,
          },
          {
            answer: null,
            space: 1,
          },
          'vᵒ',
          {
            answer: null,
            space: 1,
          },
          '♭vii',
        ],
      ],
    }

    return {
      rows: answerList.rows.map(row => row.map((answerOrCellConfig): Exercise.AnswerConfig<RomanNumeralChord> => {
        if (typeof answerOrCellConfig === 'string') {
          return {
            answer: answerOrCellConfig,
            playOnClick: getPlayOnClickPart(romanNumeralToChordInC[answerOrCellConfig]!),
          }
        } else {
          if (!answerOrCellConfig.playOnClick && answerOrCellConfig.answer) {
            return {
              ...answerOrCellConfig,
              playOnClick: getPlayOnClickPart(romanNumeralToChordInC[answerOrCellConfig.answer]!),
            }
          } else {
            return answerOrCellConfig;
          }
        }
      }))
    }
  }
}
