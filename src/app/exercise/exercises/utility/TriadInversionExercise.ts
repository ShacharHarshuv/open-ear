import { BaseTonalExercise } from './BaseTonalExercise';
import { Exercise } from '../../Exercise';
import {
  ChordSymbol,
  TriadInversion,
  Chord,
} from '../../utility/music/chords';
import { randomFromList } from '../../../shared/ts-utility';

type TriadInversionAnswer = 'Root Position' | '1st Inversion' | '2nd Inversion'

const triadInversions: TriadInversionAnswer[] = [
  'Root Position',
  '1st Inversion',
  '2nd Inversion',
];

export class TriadInversionExercise extends BaseTonalExercise<TriadInversionAnswer> {
  readonly name: string = 'Triad Inversions';
  readonly description: string = 'Find the inversion of a triad in close position';

  getQuestionInC(): Exclude<Exercise.Question<TriadInversionAnswer>, 'cadence'> {
    const chordsInC: ChordSymbol[] = ['C', 'Dm', 'Em', 'F', 'G', 'Am'];
    const randomChordInC: ChordSymbol = randomFromList(chordsInC);
    const randomTriadInversion: TriadInversion = randomFromList([0, 1, 2]);
    const answer = triadInversions[randomTriadInversion];
    return {
      segments: [
        {
          partToPlay: [{
            notes: new Chord(randomChordInC).getVoicing({
              topVoicesInversion: randomTriadInversion,
              withBass: false,
            }),
            velocity: 0.3,
            duration: '1n',
            time: 0,
          }],
          rightAnswer: answer,
        }
      ],
    };
  }

  getQuestion(): Exercise.Question<TriadInversionAnswer> {
    return {
      ...super.getQuestion(),
      cadence: undefined,
    }
  }

  protected _getAllAnswersList(): Exercise.AnswerList<TriadInversionAnswer> {
    return {
      rows: triadInversions.map(triadInversion => [triadInversion]),
    };
  }
}
