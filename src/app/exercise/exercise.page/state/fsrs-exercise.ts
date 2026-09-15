import { isEqual } from 'lodash';
import { ExerciseLogic, Question } from '../../exercise-logic';

/**
 * Spaced-repetition tracking based on "interference" (how many other
 * questions have been asked in between) rather than real-world elapsed
 * time. This intentionally replaces the previous FSRS/time-based approach,
 * per concerns raised by the app's own maintainer:
 *
 *  1. Questions answered correctly on the first try are never tracked at
 *     all - there's no reason to schedule a repeat of something that
 *     wasn't actually a mistake.
 *  2. Only mistakes get scheduled for review, and the "elapsed time" unit
 *     is the number of other questions seen in between, not the clock.
 *  3. Once a mistake has been answered correctly enough times in a row
 *     (CORRECTED_THRESHOLD), it's considered corrected and stops being
 *     tracked/repeated entirely.
 *  4. The math is intentionally simple (SM-2-flavored: interval doubles on
 *     each successful repeat, resets on a fresh mistake) rather than a
 *     full FSRS-style model with per-card optimized parameters.
 */

// How many other questions must be seen before a freshly-missed question
// is eligible to come back up.
const INITIAL_INTERVAL_IN_QUESTIONS = 3;

// How much the interval grows each time the question is answered
// correctly again during a repeat (SM-2-style geometric growth).
const INTERVAL_GROWTH_FACTOR = 2;

// Consecutive correct repeats (since the last mistake) needed before a
// question is considered "corrected" and stops being tracked.
const CORRECTED_THRESHOLD = 2;

export interface InterferenceCard {
  // how many *other* questions must be seen before this one is due again
  intervalInQuestions: number;
  // how many other questions have been seen since this one was last shown
  questionsSinceLastSeen: number;
  // consecutive correct answers in a row since the last mistake on this
  // question - once this hits CORRECTED_THRESHOLD, the question is
  // considered learned and stops being tracked
  consecutiveCorrectRepeats: number;
}

interface QuestionCard<GAnswer extends string> {
  question: Question<GAnswer>;
  // null means this question has never been missed and isn't being
  // tracked for repetition at all
  card: InterferenceCard | null;
}

export class QuestionCardsCollection<GAnswer extends string> {
  private _savedQuestions: QuestionCard<GAnswer>[] = [];
  private _dataItem = `cards_${this._id}`;

  constructor(private _id: string) {
    const savedData = localStorage.getItem(this._dataItem);
    this._savedQuestions = savedData ? JSON.parse(savedData) : [];
  }

  save() {
    localStorage.setItem(this._dataItem, JSON.stringify(this._savedQuestions));
  }

  get savedQuestions() {
    return this._savedQuestions;
  }

  remove(savedQuestion: QuestionCard<GAnswer>) {
    this._savedQuestions = this._savedQuestions.filter((q) =>
      q.question.id
        ? q.question.id !== savedQuestion.question.id
        : !isEqual(q.question, savedQuestion.question),
    );
    this.save();
  }

  insert(savedQuestion: QuestionCard<GAnswer>) {
    this._savedQuestions.push(savedQuestion);
    this.save();
  }

  reset() {
    this._savedQuestions = [];
    this.save();
  }
}

export function fsrsExercise<GAnswer extends string>(
  id: string,
  logic: Omit<ExerciseLogic<GAnswer>, 'answerList'>,
) {
  const cardsCollections = new QuestionCardsCollection<GAnswer>(id);
  let currentQuestionCard: QuestionCard<GAnswer> | null = null;

  function getCurrentQuestion() {
    if (!currentQuestionCard) {
      return null;
    }

    return (
      (currentQuestionCard.question.id &&
        logic.getQuestionById?.(currentQuestionCard.question.id)) ||
      currentQuestionCard.question
    );
  }

  function questionStartedPlaying() {
    logic.questionStartedPlaying?.();
  }

  const getQuestion: ExerciseLogic<GAnswer>['getQuestion'] = () => {
    // every question the user is shown counts as "interference" against
    // every other tracked (previously-missed) question
    cardsCollections.savedQuestions.forEach((q) => {
      q.card!.questionsSinceLastSeen++;
    });
    cardsCollections.save();

    const dueQuestions = cardsCollections.savedQuestions
      .filter((q) => q.card!.questionsSinceLastSeen >= q.card!.intervalInQuestions)
      .filter(
        (q) => !logic.isQuestionValid || logic.isQuestionValid?.(q.question),
      );

    if (dueQuestions.length > 0) {
      const randomDueQuestion =
        dueQuestions[Math.floor(Math.random() * dueQuestions.length)];
      console.log(
        `[spaced-repetition] showing a due repeat (was missed before, ${dueQuestions.length} due right now)`,
      );
      currentQuestionCard = randomDueQuestion;
      return getCurrentQuestion()!;
    }

    // fetching a brand new question - not tracked unless/until it's missed
    currentQuestionCard = {
      question: logic.getQuestion(
        cardsCollections.savedQuestions
          .map((q) => q.question.id)
          .filter((qid): qid is string => !!qid),
      ),
      card: null,
    };

    return getCurrentQuestion()!;
  };

  function handleFinishedAnswering(numberOfMistakes: number): void {
    logic.handleFinishedAnswering?.(numberOfMistakes);

    const current = currentQuestionCard!;
    const existingCard = current.card;

    if (numberOfMistakes > 0) {
      // a mistake: (re)schedule with a short interval and reset the
      // correct-streak, regardless of whether it was already being tracked
      if (existingCard) {
        cardsCollections.remove(current);
      }
      console.log(
        `[spaced-repetition] missed - will come back up in ${INITIAL_INTERVAL_IN_QUESTIONS} other questions`,
      );
      cardsCollections.insert({
        question: current.question,
        card: {
          intervalInQuestions: INITIAL_INTERVAL_IN_QUESTIONS,
          questionsSinceLastSeen: 0,
          consecutiveCorrectRepeats: 0,
        },
      });
      return;
    }

    // answered correctly with no mistakes
    if (!existingCard) {
      // first-try correct on a question that was never tracked - nothing
      // to do, there's no point scheduling a repeat of something the user
      // clearly already knows
      return;
    }

    const consecutiveCorrectRepeats = existingCard.consecutiveCorrectRepeats + 1;

    if (consecutiveCorrectRepeats >= CORRECTED_THRESHOLD) {
      // corrected - stop tracking this question entirely
      console.log(
        `[spaced-repetition] corrected after ${consecutiveCorrectRepeats} correct repeats in a row - won't repeat again`,
      );
      cardsCollections.remove(current);
      return;
    }

    // correct again, but not "corrected" yet - push the interval out
    // further and keep tracking it
    const newInterval = existingCard.intervalInQuestions * INTERVAL_GROWTH_FACTOR;
    console.log(
      `[spaced-repetition] correct repeat (${consecutiveCorrectRepeats}/${CORRECTED_THRESHOLD} needed to be "corrected") - next repeat in ${newInterval} other questions`,
    );
    cardsCollections.remove(current);
    cardsCollections.insert({
      question: current.question,
      card: {
        intervalInQuestions: newInterval,
        questionsSinceLastSeen: 0,
        consecutiveCorrectRepeats,
      },
    });
  }

  function reset() {
    cardsCollections.reset();
    logic.reset?.();
  }

  return atLeast({
    getQuestion,
    reset,
    handleFinishedAnswering,
    questionStartedPlaying,
    get cardsCollections() {
      return cardsCollections;
    },
  });

  function atLeast<U extends Omit<ExerciseLogic<GAnswer>, 'answerList'>>(
    value: U,
  ) {
    return value;
  }
}
