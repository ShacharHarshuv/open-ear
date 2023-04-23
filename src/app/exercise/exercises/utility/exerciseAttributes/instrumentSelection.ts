import Exercise, { Settings } from '../../../exercise';
import { cloneDeep } from 'lodash';

export function instrumentSelection<
  GAnswer extends string = string,
  GSettings extends Settings = Settings
>() {
  return (exercise: {
    getQuestion: (settings: GSettings) => Exercise.NotesQuestion<GAnswer>;
  }) => {
    const instrument = 'flute'; // todo: should be taken from settings

    return {
      ...exercise,
      getQuestion: (settings: GSettings): Exercise.NotesQuestion<GAnswer> => {
        const question = cloneDeep(exercise.getQuestion(settings));

        question.segments.forEach((segment) => {
          segment.instrument ??= instrument;
        });

        return question;
      },
    };
  };
}
