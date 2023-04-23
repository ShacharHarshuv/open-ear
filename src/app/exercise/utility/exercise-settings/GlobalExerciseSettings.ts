import { InstrumentName } from '../../../services/player.service';

export interface GlobalExerciseSettings {
  /**
   * If received number it will play the cadence every n exercises
   * */
  playCadence: true | false | 'ONLY_ON_REPEAT' /*| 'EVERY_NEW_KEY' | number*/; // TODO(OE-12, OE-13)
  adaptive: boolean;
  revealAnswerAfterFirstMistake: boolean;
  bpm: number;
  moveToNextQuestionAutomatically: boolean;
  answerQuestionAutomatically: boolean;
  instrument: InstrumentName;
}
