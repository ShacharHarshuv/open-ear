import {
  Key,
  randomFromList
} from '../../utility';
import { Exercise, } from '../../Exercise';
import { transpose } from '../../utility/music/transpose';
import { getDistanceOfKeys } from '../../utility/music/keys/getDistanceOfKeys';
import { iv_V_i_CADENCE_IN_C, IV_V_I_CADENCE_IN_C } from '../../utility/music/chords';
import {
  BaseCommonSettingsExercise,
  BaseCommonSettingsExerciseSettings
} from './BaseCommonSettingsExercise';
import { NoteEvent } from '../../../services/player.service';

type CadenceType = 'I IV V I' | 'i iv V i';

export type BaseTonalExerciseSettings<GAnswer extends string> = BaseCommonSettingsExerciseSettings<GAnswer> & {
  cadenceType: CadenceType;
}

const cadenceTypeToCadence: {
  [k in CadenceType]: NoteEvent[]
} = {
  'I IV V I': IV_V_I_CADENCE_IN_C,
  'i iv V i': iv_V_i_CADENCE_IN_C,
}

export abstract class BaseTonalExercise<GAnswer extends string = string, GSettings extends BaseTonalExerciseSettings<GAnswer> = BaseTonalExerciseSettings<GAnswer>> extends BaseCommonSettingsExercise<GAnswer, GSettings> {
  readonly key: Key = randomFromList(['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']);
  abstract getQuestionInC(): Exclude<Exercise.Question<GAnswer>, 'cadence'>;

  getQuestion(): Exercise.Question<GAnswer> {
    const randomQuestionInC: Exclude<Exercise.Question<GAnswer>, 'cadence'> = this.getQuestionInC();
    const selectedCadence = cadenceTypeToCadence[this._settings.cadenceType];
    return {
      segments: randomQuestionInC.segments.map(segment => ({
        rightAnswer: segment.rightAnswer,
        partToPlay: transpose(segment.partToPlay, getDistanceOfKeys(this.key, 'C')),
      })),
      cadence: transpose(selectedCadence, getDistanceOfKeys(this.key, 'C')),
      afterCorrectAnswer: randomQuestionInC.afterCorrectAnswer?.map(afterCorrectAnswerSegment => ({
        answerToHighlight: afterCorrectAnswerSegment.answerToHighlight,
        partToPlay: transpose(afterCorrectAnswerSegment.partToPlay, getDistanceOfKeys(this.key, 'C')),
      }))
    }
  }

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<GSettings>[] {
    return [
      {
        key: 'cadenceType',
        descriptor: {
          controlType: 'SELECT',
          label: 'Cadence Type',
          options: [
            {
              value: 'I IV V I',
              label: 'I IV V I (Major)',
            },
            {
              value: 'i iv V i',
              label: 'i iv V i (Minor)',
            },
          ]
        }
      },
      ...super._getSettingsDescriptor(),
    ];
  }

  protected override _getDefaultSettings(): GSettings {
    return {
      ...super._getDefaultSettings(),
      cadenceType: 'I IV V I',
    };
  }
}
