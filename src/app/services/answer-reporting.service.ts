import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import Exercise from '../exercise/exercise-logic';
import { CurrentAnswer } from '../exercise/exercise.page/state/exercise-state.service';
import { GlobalExerciseSettings } from '../exercise/utility';
import { StorageService } from '../storage/storage.service';

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
  private readonly _storageService = inject(StorageService);
  private readonly _attempts: Answer[] = [];
  private readonly _userIdKey = 'userId';
  private _userId: string | null = null;

  private async _getUserId(): Promise<string> {
    if (this._userId) {
      return this._userId;
    }

    const cachedUserId = await this._storageService.get(this._userIdKey);
    if (cachedUserId) {
      this._userId = cachedUserId;
      return cachedUserId;
    }

    const newUserId =
      'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    await this._storageService.set(this._userIdKey, newUserId);
    this._userId = newUserId;
    return newUserId;
  }

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

    const timestamp = new Date();

    const data = {
      ...rest,
      userId: await this._getUserId(),
      numberOfWrongAttempts: this._attempts.filter(
        (attempt) => !attempt.isCorrect,
      ).length,
      numberOfCorrectSegments,
      numberOfSegments,
      correctPercentage: numberOfCorrectSegments / numberOfSegments,
      attempts: this._attempts.slice(),
      timestamp,
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
