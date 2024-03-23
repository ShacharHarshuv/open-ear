import Heap from 'heap-js';
import Exercise from '../../exercise-logic';
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

interface QuestionToRepeat {
  timeToReAsk?: number; // null means the question was asked for the first time
  timesAnsweredCorrectly?: number;
  question: Exercise.Question;
}

export class AdaptiveExercise implements Exercise.Exercise {
  readonly summary: string = this._exercise.summary;
  readonly id: string = this._exercise.id;
  readonly name: string = this._exercise.name;
  readonly explanation: ExerciseExplanationContent | undefined =
    this._exercise.explanation;
  private _lastQuestion: QuestionToRepeat | null = null;
  private _wrongQuestionsHeap = new Heap<Required<QuestionToRepeat>>(
    (a: Required<QuestionToRepeat>, b: Required<QuestionToRepeat>) =>
      a.timeToReAsk - b.timeToReAsk,
  );
  private _questionIndex: number = -1;

  constructor(private _exercise: Exercise.Exercise) {}

  getSettingsDescriptor(): Exercise.SettingsControlDescriptor<{
    [p: string]: Exercise.SettingValueType;
  }>[] {
    return this._exercise.getSettingsDescriptor?.() ?? [];
  }

  updateSettings(settings: { [key: string]: Exercise.SettingValueType }): void {
    this._exercise.updateSettings?.(settings);
  }

  getCurrentSettings(): { [key: string]: Exercise.SettingValueType } {
    return this._exercise.getCurrentSettings?.()!;
  }

  getAnswerList(): Exercise.AnswerList {
    return this._exercise.getAnswerList();
  }

  getQuestion(): Exercise.Question {
    this._questionIndex++;
    if (!!this._lastQuestion) {
      throw new Error(
        `New getQuestion was called but previous answer not reported`,
      );
    }
    const nextQuestionToRepeat: Required<QuestionToRepeat> | undefined =
      this._wrongQuestionsHeap.peek();
    if (
      nextQuestionToRepeat &&
      nextQuestionToRepeat.timeToReAsk <= this._questionIndex
    ) {
      this._lastQuestion = this._wrongQuestionsHeap.pop()!;
    } else {
      this._lastQuestion = {
        question: this._exercise.getQuestion(),
      };
    }

    return this._lastQuestion.question;
  }

  reportAnswerCorrectness(wasAnswerRight: boolean | 'SKIPPED'): void {
    if (wasAnswerRight === 'SKIPPED') {
      this._lastQuestion = null;
      return;
    }
    if (!this._lastQuestion) {
      throw new Error(
        `Can't report answer for a question that was never asked`,
      );
    }

    if (
      wasAnswerRight &&
      !!this._lastQuestion?.timeToReAsk &&
      this._lastQuestion.timeToReAsk < 2 ** 3
    ) {
      this._wrongQuestionsHeap.push({
        question: this._lastQuestion.question,
        timeToReAsk:
          this._questionIndex +
          2 ** (this._lastQuestion.timesAnsweredCorrectly! + 1),
        timesAnsweredCorrectly: this._lastQuestion.timesAnsweredCorrectly! + 1,
      });
    } else if (!wasAnswerRight) {
      this._wrongQuestionsHeap.push({
        question: this._lastQuestion.question,
        timeToReAsk: this._questionIndex + 2,
        timesAnsweredCorrectly: 1,
      });
    }

    this._lastQuestion = null;
  }

  reset(): void {
    this._wrongQuestionsHeap.clear();
  }
}
