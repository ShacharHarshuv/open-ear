import * as _ from 'lodash';
import {
  Exercise,
} from '../Exercise';
import {
  generateSteadyMonophonicMelody,
  randomFromList,
  NotesRange
} from '../utility';
import { NoteNumber } from '../utility/NoteNumberOrName';
import { BaseExercise } from './BaseExercise';
import AnswerList = Exercise.AnswerList;

interface IInternalDescriptor {
  name: string;
  semitones: number;
}

const intervalDescriptorList: IInternalDescriptor[] = [
  {
    name: 'Minor 2nd',
    semitones: 1,
  },
  {
    name: 'Major 2nd',
    semitones: 2,
  },
  {
    name: 'Minor 3rd',
    semitones: 3,
  },
  {
    name: 'Major 3rd',
    semitones: 4,
  },
  {
    name: 'Perfect 4th',
    semitones: 5,
  },
  {
    name: 'Aug 4th',
    semitones: 6,
  },
  {
    name: 'Perfect 5th',
    semitones: 7,
  },
  {
    name: 'Minor 6th',
    semitones: 8,
  },
  {
    name: 'Major 6th',
    semitones: 9,
  },
  {
    name: 'Minor 7th',
    semitones: 10,
  },
  {
    name: 'Major 7th',
    semitones: 11,
  },
  {
    name: 'Octave',
    semitones: 12,
  },
]

export class IntervalExercise extends BaseExercise {
  readonly name: string = 'Interval Recognition';
  readonly description: string = 'Recognizing Intervals without context';
  readonly range = new NotesRange('C3', 'E5');

  getAnswerList(): AnswerList {
    return _.map(intervalDescriptorList, 'name');
  }

  getQuestion(): Exercise.Question {
    const randomIntervalDescriptor: IInternalDescriptor = randomFromList(intervalDescriptorList);
    const randomStartingNote: NoteNumber = _.random(this.range.lowestNoteNumber, this.range.highestNoteNumber - randomIntervalDescriptor.semitones);
    return {
      rightAnswer: randomIntervalDescriptor.name,
      partToPlay: generateSteadyMonophonicMelody(_.shuffle([
        randomStartingNote,
        randomStartingNote + randomIntervalDescriptor.semitones,
      ])),
    }
  }
}
