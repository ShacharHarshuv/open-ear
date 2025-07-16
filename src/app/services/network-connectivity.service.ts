import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkConnectivityService {
  private readonly _isOnline$ = new BehaviorSubject<boolean>(navigator.onLine);
  readonly isOnline$ = this._isOnline$.asObservable();

  constructor() {
    this._setupEventListeners();
  }

  get isOnline(): boolean {
    return this._isOnline$.value;
  }

  private _setupEventListeners(): void {
    window.addEventListener('online', () => {
      this._isOnline$.next(true);
    });

    window.addEventListener('offline', () => {
      this._isOnline$.next(false);
    });
  }
}
