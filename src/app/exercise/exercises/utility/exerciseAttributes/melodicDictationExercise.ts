import * as _ from 'lodash';
import { minBy } from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { Time } from 'tone/Tone/core/type/Units';
import Exercise from '../../../exercise-logic';
import {
  OneOrMany,
  ScaleDegree,
  SolfegeNote,
  StaticOrGetter,
  scaleDegreeToSolfegeNote,
  solfegeNoteToScaleDegree,
  toGetter,
  toNoteNumber,
} from '../../../utility';
import { toMusicalTextDisplay } from '../../../utility/music/getMusicTextDisplay';
import { getNoteOctave } from '../../../utility/music/notes/getNoteOctave';
import { getNoteType } from '../../../utility/music/notes/getNoteType';
import { noteTypeToNote } from '../../../utility/music/notes/noteTypeToNote';
import { noteTypeToScaleDegree } from '../../../utility/music/scale-degrees/noteTypeToScaleDegree';
import { scaleDegreeToNoteType } from '../../../utility/music/scale-degrees/scaleDegreeToNoteType';
import { scaleLayout } from '../answer-layouts/scale-layout';
import {
  TonalExerciseConfig,
  TonalExerciseSettings,
  TonalExerciseUtils,
  tonalExercise,
} from './tonalExercise';

type NoteInKeyDisplayMode = 'solfege' | 'numeral';

export type MelodicDictationExerciseSettings = TonalExerciseSettings & {
  displayMode: NoteInKeyDisplayMode;
};

export interface IMelodicQuestion
  extends Omit<Exercise.NotesQuestion<SolfegeNote>, 'segments'> {
  /**
   * Use array of arrays for multiple voices
   * */
  segments: OneOrMany<Note[]>;
}

export function melodicExercise<
  GSettings extends MelodicDictationExerciseSettings,
>(config?: TonalExerciseConfig) {
  const noteDuration: Time = '2n';

  return function (params: {
    getMelodicQuestionInC: StaticOrGetter<
      IMelodicQuestion,
      [GSettings, TonalExerciseUtils]
    >;
  }) {
    return tonalExercise(config)({
      getQuestion(
        settings: GSettings,
        tonalExerciseUtils: TonalExerciseUtils,
      ): Exclude<Exercise.NotesQuestion<SolfegeNote>, 'cadence'> {
        const melodicQuestionInC: IMelodicQuestion = toGetter(
          params.getMelodicQuestionInC,
        )(settings, tonalExerciseUtils);

        function isManyVoices(
          segments: OneOrMany<Note[]>,
        ): segments is Note[][] {
          return Array.isArray(segments[0]);
        }

        const notesByVoice: Note[][] = isManyVoices(melodicQuestionInC.segments)
          ? melodicQuestionInC.segments
          : [melodicQuestionInC.segments];
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
                  duration: noteDuration,
                },
              ],
              playOnWrong: (wrongAnswer) => {
                const wrongNoteType = scaleDegreeToNoteType(
                  solfegeNoteToScaleDegree[wrongAnswer],
                  'C',
                );
                const correctNoteOctave = getNoteOctave(note);
                const options = [
                  noteTypeToNote(wrongNoteType, correctNoteOctave - 1),
                  noteTypeToNote(wrongNoteType, correctNoteOctave),
                  noteTypeToNote(wrongNoteType, correctNoteOctave + 1),
                ];
                return minBy(options, (option) =>
                  Math.abs(toNoteNumber(option) - toNoteNumber(note)),
                )!;
              },
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
      },
      answerList: (settings: GSettings) =>
        Exercise.mapAnswerList(
          scaleLayout,
          (
            _answerConfig: Exercise.AnswerConfig<ScaleDegree>,
          ): Exercise.AnswerConfig<SolfegeNote> => {
            const scaleDegree: ScaleDegree | null = _answerConfig.answer;
            const answerConfig: Exercise.AnswerConfig<SolfegeNote> = {
              ...(_answerConfig as Exercise.AnswerConfig<string>),
              answer: scaleDegree
                ? scaleDegreeToSolfegeNote[scaleDegree]
                : null,
            };

            if (scaleDegree && settings.displayMode === 'numeral') {
              answerConfig.displayLabel = toMusicalTextDisplay(scaleDegree);
            }

            return answerConfig;
          },
        ),
    });
  };
}
