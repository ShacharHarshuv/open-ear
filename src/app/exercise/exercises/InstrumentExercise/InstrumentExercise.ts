import { BaseExercise } from '../utility/base-exercises/BaseExercise';
import { Exercise } from '../../Exercise';
import { randomFromList } from '../../../shared/ts-utility';
import { instrumentToVariationList } from './instrumentToAudioFilesMap';

export type InstrumentName = 'Flute' | 'Clarinet';

export class InstrumentExercise extends BaseExercise<InstrumentName> {
  readonly id: string = 'InstrumentExercise';
  readonly name: string = 'Instrument Identification';
  readonly summary: string = 'Learn to identify the sounds of different instruments';
  readonly explanation: Exercise.ExerciseExplanationContent = ''; // todo

  getAnswerList(): Exercise.AnswerList<InstrumentName> {
    return [
      'Flute',
      'Clarinet',
    ];
  }

  getQuestion(): Exercise.Question<InstrumentName> {
    const instrumentName: InstrumentName = randomFromList(['Flute', 'Clarinet']); // todo: this should be taken out the settings for included answers
    const variation: string = randomFromList(instrumentToVariationList[instrumentName]);
    return {
      type: 'audio',
      segments: [{
        rightAnswer: instrumentName,
        pathToAudio: `assets/audio/OpenEar_${instrumentName}_${variation}.mp3`,
      }]
    };
  }

}
