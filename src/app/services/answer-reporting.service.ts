import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import Exercise from '../exercise/exercise-logic';
import { CurrentAnswer } from '../exercise/exercise.page/state/exercise-state.service';
import { GlobalExerciseSettings } from '../exercise/utility';

export interface Answer {
  segmentIndex: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AnswerReportingService {
  private readonly _firestore = inject(Firestore);
  private readonly _attempts: Answer[] = [];

  async reportAttempt(
    params: Omit<Answer, 'timestamp' | 'isCorrect'>,
  ): Promise<void> {
    this._attempts.push({
      ...params,
      timestamp: new Date(),
      isCorrect: params.userAnswer === params.correctAnswer,
    });
  }

  async reportQuestion(params: {
    exerciseId: string;
    globalSettings: GlobalExerciseSettings;
    exerciseSettings: { [key: string]: Exercise.SettingValueType };
    currentAnswers: CurrentAnswer[];
  }) {
    const { currentAnswers, ...rest } = params;
    const numberOfCorrectSegments = currentAnswers.filter(
      (answer) => !answer.wasWrong,
    ).length;
    const numberOfSegments = currentAnswers.length;

    const data = {
      ...rest,
      numberOfWrongAttempts: this._attempts.filter(
        (attempt) => !attempt.isCorrect,
      ).length,
      numberOfCorrectSegments,
      numberOfSegments,
      correctPercentage: numberOfCorrectSegments / numberOfSegments,
      attempts: this._attempts.slice(),
      timestamp: new Date(),
    };

    addDoc(
      collection(
        this._firestore,
        environment.production ? 'user-answers' : 'user-answers-test',
      ),
      data,
    );
    this._attempts.length = 0;
  }
}
