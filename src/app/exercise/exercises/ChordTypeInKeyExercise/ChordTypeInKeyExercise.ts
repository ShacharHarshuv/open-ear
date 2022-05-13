import { Exercise } from '../../Exercise';
import {
  Chord,
  ChordType,
  ChordSymbol,
} from '../../utility/music/chords';
import { randomFromList } from '../../../shared/ts-utility';
import {
  NumberOfSegmentsSetting,
  numberOfSegmentsControlDescriptorList
} from '../utility/settings/NumberOfSegmentsSetting';
import * as _ from 'lodash';
import {
  BaseTonalChordProgressionExercise,
  ChordProgressionQuestion,
  BaseTonalChordProgressionExerciseSettings
} from '../utility/base-exercises/BaseTonalChordProgressionExercise';
import { ChordTypeInKeyExplanationComponent } from './chord-type-in-key-explanation/chord-type-in-key-explanation.component';
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

const chordsInC: ChordSymbol[] = [
  'C',
  'Dm',
  'Em',
  'F',
  'G',
  'Am',
]

type ChordTypeInKeySettings = NumberOfSegmentsSetting & BaseTonalChordProgressionExerciseSettings<ChordType>;

export class ChordTypeInKeyExercise extends BaseTonalChordProgressionExercise<ChordType, ChordTypeInKeySettings> {
  readonly id: string = 'chordTypeInKey';
  readonly name: string = 'Chord Types';
  readonly summary: string = 'Identify chord type (major / minor) when all chords are diatonic to the same key';
  readonly explanation: ExerciseExplanationContent = ChordTypeInKeyExplanationComponent;

  protected _getChordProgressionInC(): ChordProgressionQuestion<ChordType> {
    const chordProgression: Chord[] = [new Chord(randomFromList(chordsInC))];
    while (chordProgression.length < this._settings.numberOfSegments) {
      chordProgression.push(new Chord(randomFromList(chordsInC.filter(chord => chord !== _.last(chordProgression)!.symbol))));
    }

    return {
      segments: chordProgression
        .map((chord: Chord): ChordProgressionQuestion<ChordType>['segments'][0] => {
          return {
            answer: chord.type,
            chord: chord,
          }
        })
    }
  }

  override getQuestion(): Exercise.Question<ChordType> {
    return {
      ...super.getQuestion(),
      cadence: undefined,
      info: '',
    }
  }

  protected _getAllAnswersListInC(): Exercise.AnswerList<ChordType> {
    return [
      'M',
      'm',
    ];
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
