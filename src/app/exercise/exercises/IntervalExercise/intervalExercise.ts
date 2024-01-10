import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteEvent } from '../../../services/player.service';
import Exercise from '../../exercise-logic';
import {
  DeepReadonly,
  NotesRange,
  randomFromList,
  toArray,
  toNoteName,
  toNoteNumber,
} from '../../utility';
import { NoteNumber } from '../../utility/music/notes/NoteNumberOrName';
import { transpose } from '../../utility/music/transpose';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import {
  IncludedAnswersSettings,
  includedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import { playWrongAnswerSettings } from '../utility/settings/PlayWrongAnswerSettings';
import { IntervalExerciseExplanationComponent } from './interval-exercise-explanation/interval-exercise-explanation.component';
import AnswerList = Exercise.AnswerList;

export type IntervalName =
  | 'Minor 2nd'
  | 'Major 2nd'
  | 'Minor 3rd'
  | 'Major 3rd'
  | 'Perfect 4th'
  | 'Aug 4th'
  | 'Perfect 5th'
  | 'Minor 6th'
  | 'Major 6th'
  | 'Minor 7th'
  | 'Major 7th'
  | 'Octave';

export type IntervalDescriptor = {
  name: IntervalName;
  semitones: number;
};

export type IntervalExerciseSettings = IncludedAnswersSettings<IntervalName> & {
  intervalType: 'melodic' | 'harmonic';
};

export const intervalDescriptorList: DeepReadonly<IntervalDescriptor[]> = [
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
];

const intervalNameToIntervalDescriptor: Record<
  IntervalName,
  IntervalDescriptor
> = _.keyBy(intervalDescriptorList, 'name') as Record<
  IntervalName,
  IntervalDescriptor
>;

export const intervalExercise = () => {
  const allAnswersList: AnswerList<IntervalName> = {
    rows: [
      ['Minor 2nd', 'Major 2nd'],
      ['Minor 3rd', 'Major 3rd'],
      ['Perfect 4th', 'Aug 4th', 'Perfect 5th'],
      ['Minor 6th', 'Major 6th'],
      ['Minor 7th', 'Major 7th'],
      ['Octave'],
    ].map((row: IntervalName[]) =>
      row.map((interval: IntervalName) => {
        return {
          answer: interval,
          // todo: consider removing, and use playOnWrong instead
          playOnClick: (question: Exercise.NotesQuestion<IntervalName>) => {
            const noteList: Note[] = toArray<NoteEvent | Note>(
              question.segments[0].partToPlay,
            ).map((noteOrEvent): Note => {
              if (typeof noteOrEvent === 'object') {
                return toArray(noteOrEvent.notes)[0]; // assuming no harmonic notes
              } else {
                return noteOrEvent;
              }
            });
            const startNote: Note = _.first(noteList)!;
            const endNote: Note = _.last(noteList)!;
            const originalInterval: number =
              toNoteNumber(endNote) - toNoteNumber(startNote);
            const direction: 1 | -1 = (originalInterval /
              Math.abs(originalInterval)) as 1 | -1;
            return [
              startNote,
              transpose(
                startNote,
                direction *
                  intervalNameToIntervalDescriptor[interval].semitones,
              ),
            ];
          },
        };
      }),
    ),
  };
  const range = new NotesRange('C3', 'E5');

  return composeExercise(
    includedAnswersSettings({
      name: 'Intervals',
    }),
    () => ({
      settingsDescriptors: [
        {
          key: 'intervalType',
          info: 'Whether two notes are played sequentially or simultaneously.',
          descriptor: {
            label: 'Interval Type',
            controlType: 'select',
            options: [
              {
                label: 'Melodic',
                value: 'melodic',
              },
              {
                label: 'Harmonic',
                value: 'harmonic',
              },
            ],
          },
        },
      ],
    }),
    playWrongAnswerSettings(),
    createExercise,
  )({
    id: 'interval',
    name: 'Intervals',
    summary: 'Identify intervals chromatically (no key)',
    explanation: IntervalExerciseExplanationComponent,
    getQuestion(
      settings: IntervalExerciseSettings,
    ): Exercise.Question<IntervalName> {
      const randomIntervalDescriptor: IntervalDescriptor = randomFromList(
        intervalDescriptorList.filter((intervalDescriptor) =>
          settings.includedAnswers.includes(intervalDescriptor.name),
        ),
      );
      const randomStartingNoteNumber: NoteNumber = _.random(
        range.lowestNoteNumber,
        range.highestNoteNumber - randomIntervalDescriptor.semitones,
      );
      let lowNoteName = toNoteName(randomStartingNoteNumber);
      let highNoteName = toNoteName(
        randomStartingNoteNumber + randomIntervalDescriptor.semitones,
      );
      let [startNoteName, endNoteName] = _.shuffle([lowNoteName, highNoteName]);
      function getPartFromNotes(start: Note, end: Note) {
        return settings.intervalType === 'melodic'
          ? [{ notes: start }, { notes: end }]
          : [{ notes: [start, end] }];
      }

      const partToPlay = getPartFromNotes(startNoteName, endNoteName);

      return {
        segments: [
          {
            rightAnswer: randomIntervalDescriptor.name,
            partToPlay: partToPlay,
            playOnWrong: (wrongInterval) => {
              const isAscending =
                toNoteNumber(startNoteName) < toNoteNumber(endNoteName);
              const direction = isAscending ? 1 : -1;
              const wrongEndNoteName = transpose(
                startNoteName,
                intervalNameToIntervalDescriptor[wrongInterval].semitones *
                  direction,
              );

              return getPartFromNotes(startNoteName, wrongEndNoteName);
            },
          },
        ],
        info: {
          beforeCorrectAnswer: `Notes played: ${startNoteName} - ?`,
          afterCorrectAnswer: `Notes played: ${startNoteName} - ${endNoteName}`,
        },
      };
    },
    answerList: allAnswersList,
    defaultSettings: {
      intervalType: 'melodic',
    },
  });
};
