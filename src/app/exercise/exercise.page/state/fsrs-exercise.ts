import { max, sumBy } from 'lodash';
import * as Tone from 'tone';
import { Card, Grade, Rating, createEmptyCard, fsrs } from 'ts-fsrs';
import { NoteEvent } from '../../../services/player.service';
import { Exercise, Question } from '../../exercise-logic';

const f = fsrs();

interface QuestionCard {
  question: Question;
  card: Card;
}

function getQuestionPlayingTime(question: Question): number {
  if (question.type === 'youtube') {
    return (question.endSeconds - question.segments[0].seconds) * 1000;
  } else {
    return sumBy(question.segments, (segment): number => {
      const { partToPlay } = segment;

      if (!Array.isArray(partToPlay) || typeof partToPlay[0] === 'string') {
        return Tone.Time('4n').toMilliseconds();
      }

      return (
        max(
          (partToPlay as NoteEvent[]).map((note: NoteEvent) =>
            Tone.Time(note.duration).toMilliseconds(),
          ),
        ) ?? 0
      );
    });
  }
}

// todo: consider what kind of data structure we want to use here
export class QuestionCardsCollection {
  private _savedQuestions: QuestionCard[] = [];
  private _dataItem = `cards_${this._id}`;

  constructor(private _id: string) {
    const savedData = localStorage.getItem(this._dataItem);
    this._savedQuestions = savedData ? JSON.parse(savedData) : [];
    this._savedQuestions.forEach((q) => {
      q.card.due = new Date(q.card.due);
    });
  }

  private _save() {
    localStorage.setItem(this._dataItem, JSON.stringify(this._savedQuestions));
  }

  get savedQuestions() {
    return this._savedQuestions;
  }

  remove(savedQuestion: QuestionCard) {
    this._savedQuestions = this._savedQuestions.filter(
      (q) => q.question.id !== savedQuestion.question.id,
    );
    this._save();
  }

  insert(savedQuestion: QuestionCard) {
    this._savedQuestions.push(savedQuestion);
    this._save();
  }

  reset() {
    this._savedQuestions = [];
    this._save();
  }
}

export function fsrsExercise(exercise: Exercise) {
  console.log('fsrsExercise');
  const cardsCollections = new QuestionCardsCollection(exercise.id);
  let currentQuestionCard: QuestionCard | null = null;
  function getCurrentQuestion() {
    if (!currentQuestionCard) {
      return null;
    }

    return (
      (currentQuestionCard.question.id &&
        exercise.getQuestionById?.(currentQuestionCard.question.id)) ||
      currentQuestionCard.question
    );
  }
  let questionReceivedTime = new Date();
  let isQuestionStartedPlaying = false;

  function questionStartedPlaying() {
    !isQuestionStartedPlaying && (questionReceivedTime = new Date());
    isQuestionStartedPlaying = true;
  }

  const getQuestion: Exercise['getQuestion'] = () => {
    isQuestionStartedPlaying = false;
    console.log('savedQuestions', cardsCollections.savedQuestions);
    const dueQuestions = cardsCollections.savedQuestions.filter(
      (q) => q.card.due.getTime() < new Date().getTime(),
    );

    console.log(`There are ${dueQuestions.length} due questions`);

    if (dueQuestions.length > 0) {
      // todo: consider taking into account which question is due more closely
      const randomDueQuestion =
        dueQuestions[Math.floor(Math.random() * dueQuestions.length)];
      console.log('selected question', randomDueQuestion.question.info);
      currentQuestionCard = randomDueQuestion;
      return getCurrentQuestion()!;
    }

    // fetching new question
    console.log('fetching new question');
    currentQuestionCard = {
      question: exercise.getQuestion(
        cardsCollections.savedQuestions
          .map((q) => q.question.id)
          .filter((id): id is string => !!id),
      ),
      card: createEmptyCard(),
    };

    questionReceivedTime = new Date();
    return getCurrentQuestion()!;
  };

  function handleFinishedAnswering(numberOfMistakes: number): void {
    const rating = ((): Grade => {
      if (numberOfMistakes > 1) {
        console.log(
          `finished with ${numberOfMistakes} mistakes. Rating: Again`,
        );
        return Rating.Again;
      }

      if (numberOfMistakes === 1) {
        console.log('Only 1 mistake, rating: Hard');
        return Rating.Hard;
      }

      const answerTime = new Date();
      const totalTimeToAnswer =
        answerTime.getTime() - questionReceivedTime.getTime();
      const totalQuestionPlayingTime = getQuestionPlayingTime(
        currentQuestionCard!.question,
      );
      const numberOfSegments = currentQuestionCard!.question.segments.length;
      const perfectTime = totalQuestionPlayingTime + numberOfSegments * 1000;

      if (totalTimeToAnswer < perfectTime) {
        console.log('No mistakes with perfect time, rating: Easy');
        return Rating.Easy;
      }

      if (totalTimeToAnswer > perfectTime * 2) {
        console.log('No mistakes, but took too very long, rating: Hard');
        return Rating.Hard;
      }

      console.log('No mistakes but a little slow, rating: Good');

      return Rating.Good;
    })();

    console.log('rating', rating);
    const updatedCard = f.next(
      currentQuestionCard!.card,
      new Date(),
      rating,
    ).card;
    console.log('card will come up next on', updatedCard.due);
    console.log('updated card', updatedCard);
    cardsCollections.remove(currentQuestionCard!);
    cardsCollections.insert({
      question: currentQuestionCard!.question,
      card: updatedCard,
    });
  }

  function reset() {
    cardsCollections.reset();
  }

  return Object.assign({}, exercise, {
    getQuestion,
    reset,
    handleFinishedAnswering,
    questionStartedPlaying,
  });
}
