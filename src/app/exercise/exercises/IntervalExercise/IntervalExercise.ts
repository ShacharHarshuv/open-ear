import * as _ from 'lodash';
import { Exercise } from '../../Exercise';
import {
  randomFromList,
  NotesRange,
  toNoteName,
  toArray,
  toNoteNumber,
} from '../../utility';
import { NoteNumber } from '../../utility/music/notes/NoteNumberOrName';
import { IntervalExerciseExplanationComponent } from "./interval-exercise-explanation/interval-exercise-explanation.component";
import { NoteEvent } from '../../../services/player.service';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { transpose } from '../../utility/music/transpose';
import { BaseExercise } from '../utility/base-exercises/BaseExercise';
import {
  IncludedAnswersSetting,
  IncludedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import { Memoize } from 'lodash-decorators';

export type IntervalName = 'Minor 2nd' | 'Major 2nd' | 'Minor 3rd' | 'Major 3rd' | 'Perfect 4th' | 'Aug 4th' | 'Perfect 5th' | 'Minor 6th' | 'Major 6th' | 'Minor 7th' | 'Major 7th' | 'Octave';

export interface IIntervalDescriptor {
  name: IntervalName;
  semitones: number;
}

export type IntervalExerciseSettings = IncludedAnswersSettings<IntervalName>

@IncludedAnswersSetting<IntervalName>({
  default: IntervalExercise.getDefaultSelectedAnswers(),
})
export class IntervalExercise extends BaseExercise<IntervalName, IntervalExerciseSettings> {
  readonly id: string = 'interval';
  readonly name: string = 'Intervals';
  readonly summary: string = 'Identify intervals chromatically (no key)';
  readonly explanation = IntervalExerciseExplanationComponent;
  readonly range = new NotesRange('C3', 'E5');

  static readonly intervalDescriptorList: IIntervalDescriptor[] = [
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

  private static readonly _intervalNameToIntervalDescriptor: { [intervalName in IntervalName]: IIntervalDescriptor } = _.keyBy(IntervalExercise.intervalDescriptorList, 'name') as { [intervalName in IntervalName]: IIntervalDescriptor };

  getQuestion(): Exercise.Question<IntervalName> {
    const randomIntervalDescriptor: IIntervalDescriptor = randomFromList(IntervalExercise.intervalDescriptorList.filter(intervalDescriptor => this._settings.includedAnswers.includes(intervalDescriptor.name)));
    const randomStartingNote: NoteNumber = _.random(this.range.lowestNoteNumber, this.range.highestNoteNumber - randomIntervalDescriptor.semitones);
    return {
      segments: [{
        rightAnswer: randomIntervalDescriptor.name,
        partToPlay: _.shuffle([
          toNoteName(randomStartingNote),
          toNoteName(randomStartingNote + randomIntervalDescriptor.semitones),
        ]),
      }],
    }
  }

  // This will be overridden by IncludedAnswersSetting
  getAnswerList(): Exercise.AnswerList<IntervalName> {
    return [];
  }

  @Memoize()
  getAllAnswersList(): Exercise.AnswerList<IntervalName> {
    return {
      rows: [
        ['Minor 2nd', 'Major 2nd'],
        ['Minor 3rd', 'Major 3rd'],
        ['Perfect 4th', 'Aug 4th', 'Perfect 5th'],
        ['Minor 6th', 'Major 6th'],
        ['Minor 7th', 'Major 7th'],
        ['Octave'],
      ].map((row: IntervalName[]) => row.map((interval: IntervalName) => {
        return {
          answer: interval,
          playOnClick: (question: Exercise.NotesQuestion<IntervalName>) => {
            const noteList: Note[] = toArray<NoteEvent | Note>(question.segments[0].partToPlay)
              .map((noteOrEvent): Note => {
                if (typeof noteOrEvent === 'object') {
                  return toArray(noteOrEvent.notes)[0]; // assuming no harmonic notes
                } else {
                  return noteOrEvent;
                }
              })
            const startNote: Note = _.first(noteList)!;
            const endNote: Note = _.last(noteList)!;
            const originalInterval: number = toNoteNumber(endNote) - toNoteNumber(startNote);
            const direction: 1 | -1 = originalInterval / Math.abs(originalInterval) as 1 | -1;
            return [
              startNote,
              transpose(startNote, direction * IntervalExercise._intervalNameToIntervalDescriptor[interval].semitones),
            ]
          },
        }
      })),
    };
  }

  static getDefaultSelectedAnswers(): IntervalName[] {
    return ['Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Aug 4th', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave']
  }
}
