import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import {
  AnswerList,
  Exercise,
  ExerciseLogic,
  Question,
} from '../../exercise-logic';
import {
  DeepReadonly,
  NotesRange,
  randomFromList,
  toNoteName,
  toNoteNumber,
} from '../../utility';
import { NoteNumber } from '../../utility/music/notes/NoteNumberOrName';
import { transpose } from '../../utility/music/transpose';
import {
  IncludedAnswersSettings,
  useIncludedAnswers,
} from '../utility/settings/IncludedAnswersSettings';
import {
  PlayWrongAnswerSettings,
  usePlayWrongAnswer,
} from '../utility/settings/PlayWrongAnswerSettings';
import { IntervalExerciseExplanationComponent } from './interval-exercise-explanation/interval-exercise-explanation.component';

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

export type IntervalExerciseSettings = PlayWrongAnswerSettings &
  IncludedAnswersSettings<IntervalName> & {
    intervalType: 'melodic' | 'harmonic';
    intervalDirection: 'random' | 'ascending' | 'descending';
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
      };
    }),
  ),
};
const range = new NotesRange('C3', 'E5');

const includedAnswers = useIncludedAnswers({
  name: 'Intervals',
  fullAnswerList: allAnswersList,
});

const playWrongAnswer = usePlayWrongAnswer();

export const intervalExercise: Exercise<
  IntervalName,
  IntervalExerciseSettings
> = {
  id: 'interval',
  name: 'Intervals',
  summary: 'Identify intervals chromatically (no key)',
  explanation: IntervalExerciseExplanationComponent,
  settingsConfig: {
    defaults: {
      ...includedAnswers.defaults,
      ...playWrongAnswer.defaults,
      intervalType: 'melodic',
      intervalDirection: 'random',
    },
    controls: [
      includedAnswers.settingDescriptor,
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
      {
        key: 'intervalDirection',
        info: 'Whether the interval is played ascending or descending. Default is for a random choice of either to be picked.',
        descriptor: {
          label: 'Interval Direction',
          controlType: 'select',
          options: [
            {
              label: 'Random',
              value: 'random',
            },
            {
              label: 'Ascending',
              value: 'ascending',
            },
            {
              label: 'Descending',
              value: 'descending',
            },
          ],
        },
      },
      playWrongAnswer.settingDescriptor,
    ],
  },
  logic: (settings): ExerciseLogic<IntervalName> => {
    function getQuestion(): Question<IntervalName> {
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
      if (settings.intervalDirection === 'ascending') {
        [startNoteName, endNoteName] = [lowNoteName, highNoteName];
      } else if (settings.intervalDirection === 'descending') {
        [startNoteName, endNoteName] = [highNoteName, lowNoteName];
      }

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
    }

    return {
      getQuestion: () => playWrongAnswer.getQuestion(settings, getQuestion),
      answerList: includedAnswers.answerList(settings),
    };
  },
};
