import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { Exercise, ExerciseLogic } from '../../exercise-logic';
import {
  Interval,
  RomanNumeralChordSymbol,
  toArray,
  toNoteNumber,
  toSteadyPart,
} from '../../utility';
import { composeSequenceWithGrammar } from '../../utility/grammer';
import { Chord, TriadPosition } from '../../utility/music/chords';
import { romanNumeralToChordInC } from '../../utility/music/harmony/romanNumeralToChordInC';
import { transpose } from '../../utility/music/transpose';
import { allRomanNumeralAnswerList } from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/roman-numeral-answer-list';
import {
  RomanAnalysisChordProgressionExerciseSettings,
  useRomanAnalysisChordProgressionExercise,
} from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/romanAnalysisChordProgressionExercise';
import {
  CadenceTypeSetting,
  cadenceType,
  getCadence,
} from '../utility/settings/CadenceTypeSetting';
import {
  IncludedAnswersSettings,
  useIncludedAnswers,
} from '../utility/settings/IncludedAnswersSettings';
import {
  NumberOfSegmentsSetting,
  useNumberOfSegments,
} from '../utility/settings/NumberOfSegmentsSetting';
import {
  PlayAfterCorrectAnswerSetting,
  playAfterCorrectAnswerControlDescriptorList,
} from '../utility/settings/PlayAfterCorrectAnswerSetting';
import { ChordInKeyExplanationComponent } from './chord-in-key-explanation/chord-in-key-explanation.component';
import { chordProgressionRules } from './grammar/chord-progression-rules';

export type ChordInKeySettings =
  IncludedAnswersSettings<RomanNumeralChordSymbol> &
    RomanAnalysisChordProgressionExerciseSettings &
    NumberOfSegmentsSetting &
    PlayAfterCorrectAnswerSetting &
    CadenceTypeSetting;

const numberOfSegments = useNumberOfSegments('chord');

const romanAnalysis = useRomanAnalysisChordProgressionExercise();

const includedAnswers = useIncludedAnswers({
  name: 'Roman Numerals',
  fullAnswerList: allRomanNumeralAnswerList,
});

export const chordInKeyExercise: Exercise<
  RomanNumeralChordSymbol,
  ChordInKeySettings
> = {
  id: 'chordInKey',
  name: 'Chord Functions',
  summary: 'Identify chords based on their tonal context in a key',
  explanation: ChordInKeyExplanationComponent,
  logic: (settings): ExerciseLogic<RomanNumeralChordSymbol> => {
    return {
      getQuestion() {
        const chords = composeSequenceWithGrammar(
          settings.includedAnswers,
          settings.numberOfSegments,
          chordProgressionRules,
        );

        const chordsQuestion = romanAnalysis.getChordsQuestion(chords);

        // calculate resolution
        if (chords.length === 1 && settings.playAfterCorrectAnswer) {
          const firstChordRomanNumeral = chords[0];
          const scaleForResolution = {
            'I IV V I': 'major',
            'i iv V i': 'minor',
          }[settings.cadenceType];
          const resolutionConfig =
            romanNumeralToResolution[scaleForResolution]?.[
              firstChordRomanNumeral
            ];
          if (resolutionConfig) {
            chordsQuestion.afterCorrectAnswer = ({
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
                  chordVoicing: chordsQuestion.segments[0].chord.getVoicing({
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

        const cadenceInC = getCadence(settings.cadenceType);

        return romanAnalysis.getQuestion(settings, chordsQuestion, cadenceInC);
      },
      answerList: includedAnswers.answerList(settings),
    };
  },
  settingsConfig: {
    controls: [
      ...cadenceType.controls,
      ...romanAnalysis.settingsConfig.controls,
      includedAnswers.settingDescriptor,
      numberOfSegments.settingsDescriptor,
      ...playAfterCorrectAnswerControlDescriptorList({
        show: (settings: ChordInKeySettings) => settings.numberOfSegments === 1,
      }),
    ],
    defaults: {
      ...cadenceType.defaults,
      ...romanAnalysis.settingsConfig.defaults,
      ...numberOfSegments.defaults,
      ...includedAnswers.defaults,
      includedAnswers: ['I', 'IV', 'V'],
      numberOfSegments: 1,
      playAfterCorrectAnswer: true,
    },
  },
};

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
