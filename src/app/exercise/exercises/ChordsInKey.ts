import { BaseTonalExercise } from './BaseTonalExercise';
import { Exercise } from '../Exercise';
import {
  Chord,
  ChordSymbol,
  voiceChordProgression
} from '../utility/music/chords';
import { randomFromList } from '../utility';
import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';

type RomanNumeralChord = 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi' | 'viiᵒ';

interface ChordOption {
  chord: Chord;
  romanNumeral: RomanNumeralChord;
}

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
    const numberOfSegments = 3;
    const chordProgression: ChordOption[] = [randomFromList(this.chordsInC)];
    while (chordProgression.length < numberOfSegments) {
      chordProgression.push(randomFromList(this.chordsInC.filter(chord => chord !== _.last(chordProgression)!)));
    }

    return {
      segments: voiceChordProgression(_.map(chordProgression, 'chord'), randomFromList([0, 1, 2]))
        .map((voicing: Note[], index: number): Exercise.Question['segments'][0] => {
          return {
            rightAnswer: chordProgression[index].romanNumeral,
            partToPlay: [{
              notes: voicing,
              velocity: 0.3,
              duration: '2n',
            }],
          }
        }),
    }
  }
}
