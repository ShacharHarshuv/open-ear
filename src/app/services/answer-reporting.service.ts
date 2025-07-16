import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import Exercise from '../exercise/exercise-logic';
import { CurrentAnswer } from '../exercise/exercise.page/state/exercise-state.service';
import { GlobalExerciseSettings } from '../exercise/utility';
import { StorageService } from '../storage/storage.service';
import { NetworkConnectivityService } from './network-connectivity.service';

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
export class AnswerReportingService implements OnDestroy {
  private readonly _firestore = inject(Firestore);
  private readonly _storageService = inject(StorageService);
  private readonly _networkConnectivity = inject(NetworkConnectivityService);
  private readonly _attempts: Answer[] = [];
  private readonly _userIdKey = 'userId';
  private readonly _cachedAnswersKey = 'cachedAnswers';
  private _userId: string | null = null;
  private _networkSubscription: Subscription | null = null;

  constructor() {
    this._setupNetworkConnectivityListener();
  }

  ngOnDestroy(): void {
    this._networkSubscription?.unsubscribe();
  }

  private _setupNetworkConnectivityListener(): void {
    this._networkSubscription = this._networkConnectivity.isOnline$
      .pipe(filter((isOnline) => isOnline))
      .subscribe(() => {
        this.sendCachedAnswers();
      });
  }

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

    if (this._networkConnectivity.isOnline) {
      await this._sendToFirestore(data);
    } else {
      await this._cacheAnswerData(data);
    }

    this._attempts.length = 0;
  }

  private async _sendToFirestore(data: any): Promise<void> {
    try {
      await addDoc(
        collection(
          this._firestore,
          environment.production ? 'user-answers' : 'user-answers-test',
        ),
        data,
      );
    } catch (error) {
      console.error('Failed to send data to Firestore:', error);
      await this._cacheAnswerData(data);
    }
  }

  private async _cacheAnswerData(data: any): Promise<void> {
    const cachedAnswers = await this._getCachedAnswers();
    cachedAnswers.push(data);
    await this._storageService.set(this._cachedAnswersKey, cachedAnswers);
  }

  private async _getCachedAnswers(): Promise<any[]> {
    const cached = await this._storageService.get(this._cachedAnswersKey);
    return cached || [];
  }

  async sendCachedAnswers(): Promise<void> {
    if (!this._networkConnectivity.isOnline) {
      return;
    }

    const cachedAnswers = await this._getCachedAnswers();
    if (cachedAnswers.length === 0) {
      return;
    }

    const successfulSends: any[] = [];
    const failedSends: any[] = [];

    for (const data of cachedAnswers) {
      try {
        await this._sendToFirestore(data);
        successfulSends.push(data);
      } catch (error) {
        console.error('Failed to send cached answer:', error);
        failedSends.push(data);
      }
    }

    if (successfulSends.length > 0) {
      await this._storageService.set(this._cachedAnswersKey, failedSends);
    }
  }

  async getCachedAnswersCount(): Promise<number> {
    const cachedAnswers = await this._getCachedAnswers();
    return cachedAnswers.length;
  }
}
