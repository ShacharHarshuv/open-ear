import { BaseTonalExercise } from './utility/BaseTonalExercise';
import { Exercise } from '../Exercise';
import {
  Chord,
  ChordType,
  ChordSymbol,
  voiceChordProgression
} from '../utility/music/chords';
import { randomFromList } from '../../shared/ts-utility';
import {
  NumberOfSegmentsSetting,
  numberOfSegmentsControlDescriptorList
} from './utility/NumberOfSegmentsSetting';
import { BaseCommonSettingsExerciseSettings } from './utility/BaseCommonSettingsExercise';
import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';

const chordsInC: ChordSymbol[] = [
  'C',
  'Dm',
  'Em',
  'Fm',
  'G',
  'Am',
]

type ChordTypeInKeySettings = NumberOfSegmentsSetting & BaseCommonSettingsExerciseSettings<ChordType>;

export class ChordTypeInKeyExercise extends BaseTonalExercise<ChordType, ChordTypeInKeySettings> {
  protected _settings: ChordTypeInKeySettings = this._getDefaultSettings();
  readonly name: string = 'Chord type in key';
  readonly description: string = 'Identify chord type when all chords are diatonic to the same key';

  getQuestionInC(): Exclude<Exercise.Question<ChordType>, "cadence"> {
    const chordProgression: Chord[] = [new Chord(randomFromList(chordsInC))];
    while (chordProgression.length < this._settings.numberOfSegments) {
      chordProgression.push(new Chord(randomFromList(chordsInC.filter(chord => chord !== _.last(chordProgression)!.symbol))));
    }

    return {
      segments: voiceChordProgression(chordProgression, randomFromList([0, 1, 2]))
        .map((voicing: Note[], index: number): Exercise.Question<ChordType>['segments'][0] => {
          return {
            rightAnswer: chordProgression[index].type,
            partToPlay: [{
              notes: voicing,
              velocity: 0.3,
              duration: '2n',
            }],
          }
        })
    };
  }

  getQuestion(): Exercise.Question<ChordType> {
    return {
      ...super.getQuestion(),
      cadence: undefined,
    }
  }

  protected _getAllAnswersList(): Exercise.AnswerList<ChordType> {
    return [
      'M',
      'm',
    ];
  }

  protected _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<ChordTypeInKeySettings>[] {
    return [
      ...super._getSettingsDescriptor(),
      ...numberOfSegmentsControlDescriptorList,
    ]
  }

  private _getDefaultSettings(): ChordTypeInKeySettings {
    return {
      ...this._settings,
      numberOfSegments: 1,
    };
  }

}
