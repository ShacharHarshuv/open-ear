import {
  BaseTonalExercise,
  TonalExerciseSettings,
  TonalExerciseParams,
} from './BaseTonalExercise';
import * as _ from 'lodash';
import { Exercise } from '../../../Exercise';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteType } from '../../../utility/music/notes/getNoteType';
import { Time } from 'tone/Tone/core/type/Units';
import { toMusicalTextDisplay } from '../../../utility/music/getMusicTextDisplay';
import { scaleLayout } from '../layouts/scale-layout';
import {
  ScaleDegree,
  SolfegeNote,
  scaleDegreeToSolfegeNote,
  getNoteFromScaleDegree,
} from '../../../utility';
import { noteTypeToScaleDegree } from '../../../utility/music/scale-degrees/noteTypeToScaleDegree';

type NoteInKeyDisplayMode = 'solfege' | 'numeral';

// todo: drop the "base"
export type BaseMelodicDictationExerciseSettings = TonalExerciseSettings<SolfegeNote> & {
  displayMode: NoteInKeyDisplayMode,
};

export interface IMelodicQuestion extends Omit<Exercise.NotesQuestion<SolfegeNote>, 'segments'> {
  segments: Note[],
}

/**
 * TODO: replace this class with the following function
 * */

export function melodicExercise<GSettings extends BaseMelodicDictationExerciseSettings>(params: {
  getMelodicQuestionInC: (settings: GSettings) => IMelodicQuestion;
}): TonalExerciseParams<SolfegeNote, GSettings> {
  throw new Error('Not implemented');
}

export abstract class BaseMelodicDictationExercise<GSettings extends BaseMelodicDictationExerciseSettings> extends BaseTonalExercise<SolfegeNote, GSettings> { // Consider using "ScaleDegree" in code instead for clarity
  readonly noteDuration: Time = '2n';
  abstract getMelodicQuestionInC(): IMelodicQuestion;

  override getQuestionInC(): Exclude<Exercise.NotesQuestion<SolfegeNote>, 'cadence'> {
    const melodicQuestionInC: IMelodicQuestion = this.getMelodicQuestionInC();
    const question: Exercise.Question<SolfegeNote> = {
      ..._.omit(melodicQuestionInC, 'segments'),
      segments: melodicQuestionInC.segments.map(randomQuestionInC => ({
        rightAnswer: scaleDegreeToSolfegeNote[noteTypeToScaleDegree(getNoteType(randomQuestionInC), 'C')],
        partToPlay: [{
          notes: randomQuestionInC,
          duration: this.noteDuration,
        }],
      })),
    }

    if (melodicQuestionInC.afterCorrectAnswer) {
      question.afterCorrectAnswer = melodicQuestionInC.afterCorrectAnswer;
    }

    return question;
  }

  protected _getAnswersListInC(): Exercise.AnswerList<SolfegeNote> {
    return Exercise.mapAnswerList(scaleLayout, (_answerConfig: Exercise.AnswerConfig<ScaleDegree>): Exercise.AnswerConfig<SolfegeNote> => {
      const scaleDegree: ScaleDegree | null = _answerConfig.answer;
      const answerConfig: Exercise.AnswerConfig<SolfegeNote> = {
        ..._answerConfig as Exercise.AnswerConfig<string>,
        answer: scaleDegree ? scaleDegreeToSolfegeNote[scaleDegree] : null,
        playOnClick: scaleDegree && getNoteFromScaleDegree('C', scaleDegree),
      }

      if (scaleDegree && this._settings.displayMode === 'numeral') {
        answerConfig.displayLabel = toMusicalTextDisplay(scaleDegree);
      }

      return answerConfig;
    })
  }
}
