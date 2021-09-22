import { BaseTonalExercise } from './BaseTonalExercise';
import { Exercise } from '../Exercise';
import {
  Chord,
  ChordType,
  ChordSymbol
} from '../utility/music/chords';
import { randomFromList } from '../../shared/ts-utility';

const chordQualitiesInC: ChordSymbol[] = [
  'C',
  'Dm',
  'Em',
  'Fm',
  'G',
  'Am',
]

export class ChordTypeInKeyExercise extends BaseTonalExercise<ChordType> {
  readonly name: string = 'Chord type in key';
  readonly description: string = 'Identify chord type when all chords are diatonic to the same key';

  getQuestionInC(): Exclude<Exercise.Question<ChordType>, "cadence"> {
    const randomChord: Chord = new Chord(randomFromList(chordQualitiesInC));
    return {
      segments: [
        {
          rightAnswer: randomChord.type,
          partToPlay: [{
            notes: randomChord.getVoicing({ topVoicesInversion: randomFromList([0, 1, 2])}),
            velocity: 0.3,
            duration: '2n',
          }]
        }
      ]
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

}
