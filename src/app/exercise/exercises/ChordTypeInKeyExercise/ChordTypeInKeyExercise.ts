import { Exercise } from '../../Exercise';
import {
  Chord,
  ChordType,
  ChordSymbol,
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
import { toMusicalTextDisplay } from '../../utility/music/getMusicTextDisplay';
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

const chordsInC: ChordSymbol[] = [
  'C',
  'Dm',
  'Em',
  'F',
  'G',
  'Am',
]

type ChordTypeInKeySettings = NumberOfSegmentsSetting &
  BaseTonalChordProgressionExerciseSettings<ChordType> & {
    includedRomanNumerals: RomanNumeralChordSymbol[],
  };

@SettingsDescriptors<ChordTypeInKeySettings>({
  key: 'includedRomanNumerals',
  defaultValue: ['I', 'ii', 'iii', 'IV', 'V', 'vi'],
  descriptor: {
    label: 'Included Chords',
    controlType: 'included-answers',
    answerList: {
      rows: [
        ChordType.Major,
        ChordType.Minor,
        ChordType.Diminished,
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
  }
})
export class ChordTypeInKeyExercise extends BaseTonalChordProgressionExercise<ChordType, ChordTypeInKeySettings> {
  readonly id: string = 'chordTypeInKey';
  readonly name: string = 'Chord Types';
  readonly summary: string = 'Identify chord type (major / minor) when all chords are diatonic to the same key';
  readonly explanation: ExerciseExplanationContent = ChordTypeInKeyExplanationComponent;

  /**
   * Currently this function apply to any included-answers settings,
   * Even though in this case the roman numerals are not really "answers"
   * */
  getAnswerDisplay(answer: ChordType): string {
    return toMusicalTextDisplay(answer);
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
    return Exercise.filterIncludedAnswers([
      ChordType.Major,
      ChordType.Minor,
      ChordType.Diminished,
    ], includedTypes);
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
