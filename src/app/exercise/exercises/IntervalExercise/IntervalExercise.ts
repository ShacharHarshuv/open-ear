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
import { BaseExercise } from '../utility/BaseExercise';
import { BaseCommonSettingsExerciseSettings } from '../utility/BaseCommonSettingsExercise';
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;
import IncludedAnswersControlDescriptor = Exercise.IncludedAnswersControlDescriptor;
import AnswerList = Exercise.AnswerList;

type Interval = 'Minor 2nd' | 'Major 2nd' | 'Minor 3rd' | 'Major 3rd' | 'Perfect 4th' | 'Aug 4th' | 'Perfect 5th' | 'Minor 6th' | 'Major 6th' | 'Minor 7th' | 'Major 7th' | 'Octave';

export interface IIntervalDescriptor {
  name: Interval;
  semitones: number;
}

type IncludedAnswersSettings<GAnswer extends string> = {
  includedAnswers: GAnswer[];
}

type Constructor<G = any> = { new(...args: any[]): G };

function IncludedAnswersSetting<GAnswer extends string>(params: {
  default: GAnswer[],
  allAnswersList: Exercise.AnswerList<GAnswer>,
}) {
  if (params.default.length < 2) {
    throw new Error(`Must provide at least 2 answers selected by default`);
  }

  return function <GConstructor extends Constructor<BaseExercise<GAnswer, IncludedAnswersSettings<GAnswer>>>>(BaseExercise: GConstructor) {
    // @ts-ignore
    return class HasIncludedAnswersSettings extends BaseExercise {
      constructor() {
        super();
      }

      protected override _getDefaultSettings(): IncludedAnswersSettings<GAnswer> {
        return {
          ...super._getDefaultSettings(),
          includedAnswers: params.default,
        };
      }

      // setting the setting's descriptor
      protected override _getSettingsDescriptor(): SettingsControlDescriptor<IncludedAnswersSettings<GAnswer>>[] {
        const includedAnswersDescriptor: IncludedAnswersControlDescriptor<GAnswer> = {
          controlType: 'INCLUDED_ANSWERS',
          label: 'Included Options',
          answerList: params.allAnswersList,
        }
        const settingsDescriptorList: SettingsControlDescriptor<BaseCommonSettingsExerciseSettings<GAnswer>>[] = [
          {
            key: 'includedAnswers',
            descriptor: includedAnswersDescriptor,
          }
        ];

        return [
          ...super._getSettingsDescriptor(),
          ...settingsDescriptorList
        ]
      }

      getAnswerList(): AnswerList<GAnswer> {
        return Exercise.filterIncludedAnswers(params.allAnswersList, this._settings.includedAnswers);
      }
    }
  }
}

type IntervalExerciseSettings = IncludedAnswersSettings<Interval>

@IncludedAnswersSetting<Interval>({
  default: ['Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Aug 4th','Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave'],
  allAnswersList: IntervalExercise.getAllAnswersList(),
})
export class IntervalExercise extends BaseExercise<Interval, IntervalExerciseSettings> {
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

  private static readonly _intervalNameToIntervalDescriptor: { [intervalName in Interval]: IIntervalDescriptor } = _.keyBy(IntervalExercise.intervalDescriptorList, 'name') as { [intervalName in Interval]: IIntervalDescriptor };

  getQuestion(): Exercise.Question<Interval> {
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
  getAnswerList(): Exercise.AnswerList<Interval> {
    return [];
  }

  static getAllAnswersList(): Exercise.AnswerList<Interval> {
    return {
      rows: [
        ['Minor 2nd', 'Major 2nd'],
        ['Minor 3rd', 'Major 3rd'],
        ['Perfect 4th', 'Aug 4th', 'Perfect 5th'],
        ['Minor 6th', 'Major 6th'],
        ['Minor 7th', 'Major 7th'],
        ['Octave'],
      ].map((row: Interval[]) => row.map((interval: Interval) => {
        return {
          answer: interval,
          playOnClick: (question: Exercise.NotesQuestion<Interval>) => {
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
}

export class A {
  constructor() {
  }
}
