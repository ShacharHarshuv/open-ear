import { Exercise } from '../../Exercise';
import {
  Chord,
  ChordType,
} from '../../utility/music/chords';
import { randomFromList } from '../../../shared/ts-utility';
import {
  NumberOfSegmentsSetting,
  numberOfSegmentsControlDescriptorList,
} from '../utility/settings/NumberOfSegmentsSetting';
import {
  BaseTonalChordProgressionExercise,
  ChordProgressionQuestion,
  ChordProgressionExerciseSettings,
} from '../utility/exerciseFactories/chordProgressionExercise';
import { ChordTypeInKeyExplanationComponent } from './chord-type-in-key-explanation/chord-type-in-key-explanation.component';
import { SettingsDescriptors } from '../utility/settings/SettingsDescriptors';
import {
  RomanNumeralChordSymbol,
  chromaticDegreeToScaleDegree,
  ScaleDegree,
} from '../../utility';
import { romanNumeralToChordInC } from '../utility/exerciseFactories/romanAnalysisChordProgressionExercise';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import { scaleLayout } from '../utility/layouts/scale-layout';
import { chordTypeConfigMap } from '../../utility/music/chords/Chord/ChordType';
import {
  flow,
  flatMap,
  filter,
} from 'lodash/fp';
import * as _ from 'lodash';
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;
import flatAnswerList = Exercise.flatAnswerList;
import normalizedAnswerList = Exercise.normalizedAnswerList;

type ChordTypeInKeySettings = NumberOfSegmentsSetting &
  ChordProgressionExerciseSettings<ChordType> & {
  includedRomanNumerals: RomanNumeralChordSymbol[],
};

@SettingsDescriptors<ChordTypeInKeySettings>(
  {
    descriptor: {
      label: 'Included Types',
      answerList: ChordTypeInKeyExercise.chordTypeAnswerList,
      controlType: 'included-answers',
    },
    getter: (currentSettings: ChordTypeInKeySettings) => {
      return _.uniq(currentSettings.includedRomanNumerals.map(romanNumeralSymbol => new RomanNumeralChord(romanNumeralSymbol).type));
    },
    onChange: (newValue: ChordType[], prevValue: ChordType[], currentSettings: ChordTypeInKeySettings): Partial<ChordTypeInKeySettings> => {
      let selectedChords = _.clone(currentSettings.includedRomanNumerals);
      const newTypes: ChordType[] = _.difference(prevValue, newValue);
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
      selectedChords = _.filter(selectedChords, romanNumeralSymbol => {
        return !removedTypes.includes(new RomanNumeralChord(romanNumeralSymbol).type);
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
      return _.every(settings.includedRomanNumerals, romanNumeralChordSymbol => new RomanNumeralChord(romanNumeralChordSymbol).isDiatonic);
    },
    onChange: (newValue: boolean, prevValue: boolean, currentSettings: ChordTypeInKeySettings): Partial<ChordTypeInKeySettings> => {
      if (newValue) {
        return {
          includedRomanNumerals: currentSettings.includedRomanNumerals.filter(romanNumeralChordSymbol => new RomanNumeralChord(romanNumeralChordSymbol).isDiatonic),
        }
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
    defaultValue: ['I', 'ii', 'iii', 'IV', 'V', 'vi'],
    descriptor: (settings: ChordTypeInKeySettings) => ({
      label: 'Included Chords (Advanced)',
      controlType: 'included-answers',
      answerList: {
        rows: flow(
          filter(chordType => _.some(settings.includedRomanNumerals, romanNumeralChordSymbol => new RomanNumeralChord(romanNumeralChordSymbol).type === chordType)),
          flatMap((chordType: ChordType): Exercise.AnswersLayout<RomanNumeralChordSymbol>['rows'] => {
            const scaleRows = normalizedAnswerList(Exercise.mapAnswerList(scaleLayout, (answerConfig: Exercise.AnswerConfig<ScaleDegree>): Exercise.AnswerConfig<RomanNumeralChordSymbol> => {
              if (!answerConfig.answer) {
                return {
                  ...answerConfig as Exercise.AnswerConfig<string>,
                  answer: null,
                }
              }
              const romanNumeralChord = new RomanNumeralChord({
                type: chordType,
                scaleDegree: answerConfig.answer,
              });
              return {
                ...answerConfig as Exercise.AnswerConfig<string>,
                answer: romanNumeralChord.romanNumeralChordSymbol,
                displayLabel: romanNumeralChord.toViewString(),
              }
            })).rows;
            return [
              chordTypeConfigMap[chordType].displayName,
              ...scaleRows,
            ]
          }),
        )(flatAnswerList(ChordTypeInKeyExercise.chordTypeAnswerList)),
      },
    }),
  },
)
export class ChordTypeInKeyExercise extends BaseTonalChordProgressionExercise<ChordType, ChordTypeInKeySettings> {
  readonly id: string = 'chordTypeInKey';
  readonly name: string = 'Chord Types';
  readonly summary: string = 'Identify chord type (major / minor) when all chords are diatonic to the same key';
  readonly explanation: ExerciseExplanationContent = ChordTypeInKeyExplanationComponent;

  static readonly chordTypeAnswerList: Exercise.AnswerList<ChordType> = Exercise.mapAnswerList({
    rows: [
      [
        ChordType.Major,
        ChordType.Minor,
      ],
      [
        ChordType.Sus4,
        ChordType.Sus2,
      ],
      [
        ChordType.Major6th,
        ChordType.Minor6th,
      ],
      [
        ChordType.Diminished,
        ChordType.Dominant7th,
      ],
      [
        ChordType.Minor7th,
        ChordType.Major7th,
      ],
      [
        ChordType.MinorMajor7th,
        ChordType.Augmented,
      ],
      [
        ChordType.Diminished7th,
        ChordType.HalfDiminished7th,
      ],
      [
        ChordType.MajorAdd9,
        ChordType.MinorAdd9,
      ],
      [
        ChordType.Dominant9th,
        ChordType.MajorAddSharp4,
      ],

    ],
  }, ((answerConfig: Exercise.AnswerConfig<ChordType>) => ({
    answer: answerConfig.answer,
    displayLabel: answerConfig.answer ? chordTypeConfigMap[answerConfig.answer].displayName : undefined,
  })));

  protected _getChordProgressionInC(): ChordProgressionQuestion<ChordType> {
    const chordProgression: RomanNumeralChordSymbol[] = [];
    while (chordProgression.length < this._settings.numberOfSegments) {
      const randomRomanNumeral = randomFromList(this._settings.includedRomanNumerals.filter(chord => chord !== _.last(chordProgression)));
      chordProgression.push(randomRomanNumeral);
    }

    return {
      segments: chordProgression
        .map((romanNumeralSymbol: RomanNumeralChordSymbol): ChordProgressionQuestion<ChordType>['segments'][0] => {
          const chord: Chord = romanNumeralToChordInC(romanNumeralSymbol);
          return {
            answer: chord.type,
            chord: chord,
          }
        }),
    }
  }

  override getQuestion(): Exercise.NotesQuestion<ChordType> {
    return {
      ...super.getQuestion(),
      cadence: undefined,
      info: '',
    }
  }

  protected _getAnswersListInC(): Exercise.AnswerList<ChordType> {
    const includedTypes = this._settings.includedRomanNumerals.map(romanNumeralSymbol => new RomanNumeralChord(romanNumeralSymbol).type);
    return Exercise.filterIncludedAnswers(ChordTypeInKeyExercise.chordTypeAnswerList, includedTypes);
  }

  override getSettingsDescriptor(): Exercise.SettingsControlDescriptor<ChordTypeInKeySettings>[] {
    return [
      ...super.getSettingsDescriptor(),
      ...numberOfSegmentsControlDescriptorList('chords'),
    ]
  }

  protected override _getDefaultSettings(): ChordTypeInKeySettings {
    return {
      ...super._getDefaultSettings(),
      numberOfSegments: 1,
    };
  }

}
