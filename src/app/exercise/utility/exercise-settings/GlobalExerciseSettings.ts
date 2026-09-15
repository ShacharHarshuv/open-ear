import { InstrumentName } from '../../../services/player.service';

export interface GlobalExerciseSettings {
  /**
   * true: always play the cadence.
   * false: only play on a new key (cadence always plays when the key
   *   changes, regardless of this setting).
   * 'ONLY_ON_REPEAT': skip the cadence on same-question repeats.
   * number: play the cadence every N trials within the same key (a cadence
   *   always plays on the first trial of a new key too, and the counter
   *   resets when the key changes).
   * */
  playCadence: true | false | 'ONLY_ON_REPEAT' | number;
  adaptive: boolean;
  revealAnswerAfterFirstMistake: boolean;
  bpm: number;
  moveToNextQuestionAutomatically: boolean;
  answerQuestionAutomatically: boolean;
  instrument: InstrumentName;
}
