import * as _ from 'lodash';
import { clone, difference, uniq } from 'lodash';
import { filter, flatMap, flow } from 'lodash/fp';
import {
  AnswerConfig,
  AnswerList,
  AnswersLayout,
  Exercise,
  ExerciseLogic,
  filterIncludedAnswers,
  flatAnswerList,
  mapAnswerList,
  normalizedAnswerList,
} from '../../exercise-logic';
import {
  RomanNumeralChordSymbol,
  ScaleDegree,
  chromaticDegreeToScaleDegree,
  randomFromList,
} from '../../utility';
import { ChordType } from '../../utility/music/chords';
import { chordTypeConfigMap } from '../../utility/music/chords/Chord/ChordType';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import { romanNumeralToChordInC } from '../../utility/music/harmony/romanNumeralToChordInC';
import { scaleLayout } from '../utility/answer-layouts/scale-layout';
import {
  ChordProgressionQuestion,
  useChordProgression,
} from '../utility/exerciseAttributes/chordProgressionExercise';
import {
  TonalExerciseSettings,
  useTonalExercise,
} from '../utility/exerciseAttributes/tonalExercise';
import {
  NumberOfSegmentsSetting,
  useNumberOfSegments,
} from '../utility/settings/NumberOfSegmentsSetting';
import { VoicingSettings } from '../utility/settings/voicing-settings';
import { ChordTypeInKeyExplanationComponent } from './chord-type-in-key-explanation/chord-type-in-key-explanation.component';

export const chordTypeAnswerList: AnswerList<ChordType> = mapAnswerList(
  {
    rows: [
      [ChordType.Major, ChordType.Minor],
      [ChordType.Sus4, ChordType.Sus2],
      [ChordType.Major6th, ChordType.Minorb6th],
      [ChordType.Diminished, ChordType.Dominant7th],
      [ChordType.Minor7th, ChordType.Major7th],
      [ChordType.MinorMajor7th, ChordType.Sharp5],
      [ChordType.Diminished7th, ChordType.HalfDiminished7th],
      [ChordType.MajorAdd9, ChordType.MinorAdd9],
      [ChordType.Dominant9th, ChordType.MajorAddSharp4],
    ],
  },
  (answerConfig: AnswerConfig<ChordType>) => ({
    answer: answerConfig.answer,
    displayLabel: answerConfig.answer
      ? chordTypeConfigMap[answerConfig.answer].displayName
      : undefined,
  }),
);

export type ChordTypeInKeySettings = TonalExerciseSettings &
  NumberOfSegmentsSetting &
  VoicingSettings & {
    includedRomanNumerals: RomanNumeralChordSymbol[];
  };

const tonalExercise = useTonalExercise({
  cadenceTypeSelection: false,
  keySelection: false,
  playCadence: false,
  droneSelection: false,
});

const numberOfSegments = useNumberOfSegments('chord');

const chordProgression = useChordProgression();

export const chordTypeExercise: Exercise<ChordType, ChordTypeInKeySettings> = {
  id: 'chordTypeInKey',
  name: 'Chord Types',
  summary:
    'Identify chord type (major / minor) when all chords are diatonic to the same key',
  explanation: ChordTypeInKeyExplanationComponent,
  logic: (settings): ExerciseLogic<ChordType> => {
    return {
      getQuestion() {
        const progression: RomanNumeralChordSymbol[] = [];
        while (progression.length < settings().numberOfSegments) {
          const availableChords = settings().includedRomanNumerals.filter(
            (chord) => chord !== progression[progression.length - 1],
          );
          const randomRomanNumeral = randomFromList(
            availableChords,
          ) as RomanNumeralChordSymbol;
          progression.push(randomRomanNumeral);
        }

        const chordsQuestionInC = {
          segments: progression.map(
            (
              romanNumeralSymbol: RomanNumeralChordSymbol,
            ): ChordProgressionQuestion<ChordType>['segments'][0] => {
              const chord = romanNumeralToChordInC(romanNumeralSymbol);
              return {
                answer: chord.type,
                chord: chord,
              };
            },
          ),
        };

        const questionInC = chordProgression.getQuestionInC(
          settings(),
          chordsQuestionInC,
        );

        return tonalExercise.getQuestion(settings(), questionInC);
      },
      answerList: filterIncludedAnswers(
        chordTypeAnswerList,
        settings().includedRomanNumerals.map(
          (romanNumeralSymbol) =>
            romanNumeralToChordInC(romanNumeralSymbol).type,
        ),
      ),
    };
  },
  settingsConfig: {
    controls: [
      {
        descriptor: {
          label: 'Included Types',
          answerList: chordTypeAnswerList,
          controlType: 'included-answers',
        },
        getter: (currentSettings: ChordTypeInKeySettings) => {
          return uniq(
            currentSettings.includedRomanNumerals.map(
              (romanNumeralSymbol) =>
                new RomanNumeralChord(romanNumeralSymbol).type,
            ),
          );
        },
        onChange: (
          newValue: ChordType[],
          prevValue: ChordType[],
          currentSettings: ChordTypeInKeySettings,
        ): Partial<ChordTypeInKeySettings> => {
          let selectedChords = clone(currentSettings.includedRomanNumerals);
          const newTypes: ChordType[] = difference(prevValue, newValue);
          for (let newType of newTypes) {
            for (let i = 1; i <= 12; i++) {
              selectedChords.push(
                new RomanNumeralChord({
                  scaleDegree: chromaticDegreeToScaleDegree[i],
                  type: newType,
                }).romanNumeralChordSymbol,
              );
            }
          }
          const removedTypes: ChordType[] = _.difference(newValue, prevValue);
          selectedChords = _.filter(selectedChords, (romanNumeralSymbol) => {
            return !removedTypes.includes(
              new RomanNumeralChord(romanNumeralSymbol).type,
            );
          });
          return {
            includedRomanNumerals: _.uniq(selectedChords),
          };
        },
      },
      {
        info: 'When turned on, only chords that includes only notes from the same scale will be played. Note - some chord types (like the diminished 7ths) cannot be included in one scale.',
        descriptor: {
          label: 'Diatonic',
          controlType: 'checkbox',
        },
        getter: (settings: ChordTypeInKeySettings): boolean => {
          return _.every(
            settings.includedRomanNumerals,
            (romanNumeralChordSymbol) =>
              new RomanNumeralChord(romanNumeralChordSymbol).isDiatonic,
          );
        },
        onChange: (
          newValue: boolean,
          prevValue: boolean,
          currentSettings: ChordTypeInKeySettings,
        ): Partial<ChordTypeInKeySettings> => {
          if (newValue) {
            return {
              includedRomanNumerals:
                currentSettings.includedRomanNumerals.filter(
                  (romanNumeralChordSymbol) =>
                    new RomanNumeralChord(romanNumeralChordSymbol).isDiatonic,
                ),
            };
          }
          return {};
        },
        isDisabled: (settings, newValue: boolean): boolean => {
          return newValue;
        },
      },
      {
        key: 'includedRomanNumerals',
        info: 'Use this option to specify over which scale degree each chord type can be played. Use this to narrow the options to a more musical selection of chords.',
        descriptor: (settings: ChordTypeInKeySettings) => ({
          label: 'Included Chords (Advanced)',
          controlType: 'included-answers',
          answerList: {
            rows: flow(
              filter((chordType) =>
                _.some(
                  settings.includedRomanNumerals,
                  (romanNumeralChordSymbol) =>
                    new RomanNumeralChord(romanNumeralChordSymbol).type ===
                    chordType,
                ),
              ),
              flatMap(
                (
                  chordType: ChordType,
                ): AnswersLayout<RomanNumeralChordSymbol>['rows'] => {
                  const scaleRows = normalizedAnswerList(
                    mapAnswerList(
                      scaleLayout,
                      (
                        answerConfig: AnswerConfig<ScaleDegree>,
                      ): AnswerConfig<RomanNumeralChordSymbol> => {
                        if (!answerConfig.answer) {
                          return {
                            ...(answerConfig as AnswerConfig<string>),
                            answer: null,
                          };
                        }
                        const romanNumeralChord = new RomanNumeralChord({
                          type: chordType,
                          scaleDegree: answerConfig.answer,
                        });
                        return {
                          ...(answerConfig as AnswerConfig<string>),
                          answer: romanNumeralChord.romanNumeralChordSymbol,
                          displayLabel: romanNumeralChord.toViewString(),
                        };
                      },
                    ),
                  ).rows;
                  return [
                    chordTypeConfigMap[chordType].displayName,
                    ...scaleRows,
                  ];
                },
              ),
            )(flatAnswerList(chordTypeAnswerList)),
          },
        }),
      },
      ...chordProgression.voicingSettingsDescriptor,
      numberOfSegments.settingsDescriptor,
    ],
    defaults: {
      ...tonalExercise.defaults,
      ...numberOfSegments.defaults,
      ...chordProgression.defaults,
      includedRomanNumerals: ['I', 'ii', 'iii', 'IV', 'V', 'vi'],
    },
  },
};
