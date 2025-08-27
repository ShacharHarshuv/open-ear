import * as _ from 'lodash';
import { NoteEvent } from 'src/app/services/player.service';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { Time } from 'tone/Tone/core/type/Units';
import Exercise, {
  AnswerConfig,
  AnswerList,
  SettingsControlDescriptor,
} from '../../../exercise-logic';
import {
  OneOrMany,
  ScaleDegree,
  SolfegeNote,
  getNoteFromScaleDegree,
  randomFromList,
  scaleDegreeToSolfegeNote,
} from '../../../utility';
import { toMusicalTextDisplay } from '../../../utility/music/getMusicTextDisplay';
import { getNoteType } from '../../../utility/music/notes/getNoteType';
import { noteTypeToScaleDegree } from '../../../utility/music/scale-degrees/noteTypeToScaleDegree';
import { scaleLayout } from '../answer-layouts/scale-layout';
import {
  TonalExerciseConfig,
  TonalExerciseSettings,
  TonalExerciseUtils,
  useTonalExercise,
} from './tonalExercise';

type NoteInKeyDisplayMode = 'solfege' | 'numeral';

export type MelodicDictationExerciseSettings = TonalExerciseSettings & {
  displayMode: NoteInKeyDisplayMode;
  // todo: this settings should be part of notesInKeyExercise instead
  rhythmicValues: string[];
};

export interface MelodicQuestion
  extends Omit<Exercise.NotesQuestion<SolfegeNote>, 'segments'> {
  /**
   * Use array of arrays for multiple voices
   * */
  segments: OneOrMany<Note[]>;
}

export function useMelodicExercise(config?: TonalExerciseConfig) {
  const defaultNoteDuration: Time = '2n';

  const tonalExercise = useTonalExercise(config);

  const defaults: MelodicDictationExerciseSettings = {
    ...tonalExercise.defaults,
    displayMode: 'numeral',
    rhythmicValues: ['2n'],
  };

  const settingsDescriptors: SettingsControlDescriptor<MelodicDictationExerciseSettings>[] =
    [
      ...tonalExercise.settingsDescriptors,
      {
        key: 'displayMode',
        info: 'Choose how the scale degrees are noted. <br>(This setting will apply only after you close the settings page.)',
        descriptor: {
          label: 'Display',
          controlType: 'select',
          options: [
            {
              label: 'Numbers',
              value: 'numeral',
            },
            {
              label: 'Movable-Do',
              value: 'solfege',
            },
          ],
        },
      },
    ];

  return {
    getQuestion: (params: {
      settings: MelodicDictationExerciseSettings;
      getMelodicQuestionInC: (utils: TonalExerciseUtils) => MelodicQuestion;
      cadenceInC?: NoteEvent[];
    }) => {
      function getQuestionInC(utils: TonalExerciseUtils) {
        const melodicQuestionInC = params.getMelodicQuestionInC(utils);

        function isManyVoices(
          segments: OneOrMany<Note[]>,
        ): segments is Note[][] {
          return Array.isArray(segments[0]);
        }

        const notesByVoice: Note[][] = isManyVoices(melodicQuestionInC.segments)
          ? melodicQuestionInC.segments
          : [melodicQuestionInC.segments];
        const rhythmicValues = params.settings.rhythmicValues;
        const segments: Exercise.NotesQuestion<SolfegeNote>['segments'] = [];
        notesByVoice.forEach((voice) => {
          voice.forEach((note, index) => {
            segments.push({
              rightAnswer:
                scaleDegreeToSolfegeNote[
                  noteTypeToScaleDegree(getNoteType(note), 'C')
                ],
              partToPlay: [
                {
                  notes: note,
                  duration:
                    voice.length > 1
                      ? randomFromList(rhythmicValues)
                      : defaultNoteDuration,
                },
              ],
              playAfter: index === 0 ? 0 : undefined,
            });
          });
        });
        const question: Exercise.Question<SolfegeNote> = {
          ..._.omit(melodicQuestionInC, 'segments'),
          segments,
        };

        if (melodicQuestionInC.afterCorrectAnswer) {
          question.afterCorrectAnswer = melodicQuestionInC.afterCorrectAnswer;
        }

        return question;
      }

      return tonalExercise.getQuestion(
        params.settings,
        getQuestionInC,
        params.cadenceInC,
      );
    },
    answerList: (
      settings: Pick<MelodicDictationExerciseSettings, 'displayMode'>,
    ): AnswerList<SolfegeNote> =>
      Exercise.mapAnswerList(
        scaleLayout,
        (
          _answerConfig: AnswerConfig<ScaleDegree>,
        ): AnswerConfig<SolfegeNote> => {
          const scaleDegree: ScaleDegree | null = _answerConfig.answer;
          const answerConfig: AnswerConfig<SolfegeNote> = {
            ...(_answerConfig as AnswerConfig<string>),
            answer: scaleDegree ? scaleDegreeToSolfegeNote[scaleDegree] : null,
            playOnClick:
              scaleDegree && getNoteFromScaleDegree('C', scaleDegree),
          };

          if (scaleDegree && settings.displayMode === 'numeral') {
            answerConfig.displayLabel = toMusicalTextDisplay(scaleDegree);
          }

          return answerConfig;
        },
      ),
    defaults,
    settingsDescriptors,
  };
}
