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
import * as _ from 'lodash';
import {
  BaseTonalChordProgressionExercise,
  ChordProgressionQuestion,
  BaseTonalChordProgressionExerciseSettings,
} from '../utility/base-exercises/BaseTonalChordProgressionExercise';
import { ChordTypeInKeyExplanationComponent } from './chord-type-in-key-explanation/chord-type-in-key-explanation.component';
import { SettingsDescriptors } from '../utility/settings/SettingsDescriptors';
import {
  RomanNumeralChordSymbol,
  chromaticDegreeToScaleDegree,
} from '../../utility';
import { romanNumeralToChordInC } from '../utility/base-exercises/BaseRomanAnalysisChordProgressionExercise';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

type ChordTypeInKeySettings = NumberOfSegmentsSetting &
  BaseTonalChordProgressionExerciseSettings<ChordType> & {
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
      selectedChords = _.filter(selectedChords,romanNumeralSymbol => {
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
          includedRomanNumerals: currentSettings.includedRomanNumerals.filter(romanNumeralChordSymbol => new RomanNumeralChord(romanNumeralChordSymbol).isDiatonic)
        }
      }
      return {};
    },
    isDisabled: (settings, newValue: boolean): boolean => {
      return newValue;
    }
  },
  {
    key: 'includedRomanNumerals',
    info: 'Use this option to specify over which scale degree each chord type can be played. Use this to narrow the options to a more musical selection of chords.',
    defaultValue: ['I', 'ii', 'iii', 'IV', 'V', 'vi'],
    descriptor: {
      label: 'Included Chords (Advanced)',
      controlType: 'included-answers',
      answerList: {
        rows: [
          ChordType.Major,
          ChordType.Minor,
          ChordType.Diminished,
          ChordType.Dominant7th,
          ChordType.Major7th,
          ChordType.Minor7th,
          ChordType.Sus4,
          ChordType.Sus2,
          ChordType.Major6th,
          ChordType.Diminished7th,
          ChordType.HalfDiminished7th,
        ].map(chordType => {
          const answers: RomanNumeralChordSymbol[] = [];
          for (let i = 1; i <= 12; i++) {
            answers.push(
              new RomanNumeralChord({
                scaleDegree: chromaticDegreeToScaleDegree[i],
                type: chordType,
              }).romanNumeralChordSymbol,
            );
          }
          return answers;
        }),
      },
    },
  },
)
export class ChordTypeInKeyExercise extends BaseTonalChordProgressionExercise<ChordType, ChordTypeInKeySettings> {
  readonly id: string = 'chordTypeInKey';
  readonly name: string = 'Chord Types';
  readonly summary: string = 'Identify chord type (major / minor) when all chords are diatonic to the same key';
  readonly explanation: ExerciseExplanationContent = ChordTypeInKeyExplanationComponent;

  static readonly chordTypeAnswerList: Exercise.AnswerList<ChordType> = {
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
        null, // ChordType.Minor6th
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
        null, // ChordType.MinorMajor7th,
        null, // ChordType.Augmented5th,
      ],
      [
        ChordType.Diminished7th,
        ChordType.HalfDiminished7th,
      ],
    ],
  };

  getAnswerDisplay(answer: ChordType): string {
    const chordTypeToName: Record<ChordType, string> = {
      [ChordType.Major]: 'Major Triad',
      [ChordType.Minor]: 'Minor Triad',
      [ChordType.Diminished]: 'Diminished Triad',
      [ChordType.Dominant7th]: 'Dominant 7th',
      [ChordType.Major7th]: 'Major 7th',
      [ChordType.Minor7th]: 'Minor 7th',
      [ChordType.Sus4]: 'Suspended 4th',
      [ChordType.Sus2]: 'Suspended 2nd',
      [ChordType.Major6th]: 'Major 6th',
      [ChordType.Diminished7th]: 'Diminished 7th',
      [ChordType.HalfDiminished7th]: 'Half Diminished 7th',
    }
    /**
     * Currently this function apply to any included-answers settings,
     * Even though in this case the roman numerals are not really "answers"
     * */
    return chordTypeToName[answer] ?? answer;
  }

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

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<ChordTypeInKeySettings>[] {
    return [
      ...super._getSettingsDescriptor(),
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
