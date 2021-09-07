import { BaseTonalExercise } from './BaseTonalExercise';
import { Exercise } from '../Exercise';
import { Chord } from '../utility/music/chords';
import { randomFromList } from '../utility';

type RomanNumeralChord = 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi' | 'viiᵒ';

export class ChordsInKey extends BaseTonalExercise<RomanNumeralChord> {
  readonly name: string = 'Chord in Key';
  readonly description: string = 'Recognise chords based on their tonal context in a key';
  readonly chordsInC: { chord: Chord; romanNumeral: RomanNumeralChord }[] = [
    {
      chord: new Chord('C'),
      romanNumeral: 'I',
    },
    {
      chord: new Chord('F'),
      romanNumeral: 'IV',
    },
    {
      chord: new Chord('G'),
      romanNumeral: 'V',
    },
  ]

  getAnswerList(): Exercise.AnswerList<RomanNumeralChord> {
    return [
      'I',
      'IV',
      'V',
    ];
  }

  getQuestionInC(): Exclude<Exercise.Question, "cadence"> {
    const randomChord = randomFromList(this.chordsInC);
    return {
      segments: [{
        rightAnswer: randomChord.romanNumeral,
        partToPlay: [
          {
            notes: randomChord.chord.getVoicing(randomFromList([0, 1, 2])),
            velocity: 0.3,
            duration: '1n',
          },
        ],
      }]
    }
  }
}
