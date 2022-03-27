import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { YouTubePlayer } from 'youtube-player/dist/types';
import * as PriorityQueue from 'js-priority-queue';
import PlayerFactory from 'youtube-player';
import { filter, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import { BaseDestroyable } from '../shared/ts-utility';

export interface YouTubeCallbackDescriptor {
  seconds: number;
  callback: () => void;
}

const TIME_STAMP_POLLING: number = 200;

@Injectable({
  providedIn: 'root'
})
export class YouTubePlayerService extends BaseDestroyable {
  private _isPlaying$ = new BehaviorSubject(false);
  private _youTubePlayer: YouTubePlayer = this._getYouTubePlayer();
  private _callBackQueue = new PriorityQueue<YouTubeCallbackDescriptor>({
    comparator: (a: YouTubeCallbackDescriptor, b: YouTubeCallbackDescriptor) => {
      return a.seconds - b.seconds;
    }
  });

  constructor() {
    super();
    this._startTimeListener();
  }

  private _getYouTubePlayer(): YouTubePlayer {
    const elm = document.createElement('div');
    document.body.appendChild(elm);
    return PlayerFactory(elm);
  }

  private _startTimeListener(): void {
    this._isPlaying$.pipe(
      switchMap((isPlaying) => {
        if (!isPlaying) {
          return NEVER;
        } else {
          return interval(TIME_STAMP_POLLING);
        }
      }),
      takeUntil(this._destroy$),
    ).subscribe(async () => {
      if (!this._callBackQueue.length) {
        return;
      }
      const nextCallback = this._callBackQueue.peek();
      if (await this._youTubePlayer.getCurrentTime() > nextCallback.seconds - (TIME_STAMP_POLLING / 2000)) {
        this._callBackQueue.dequeue();
        nextCallback.callback();
      }
    });
  }

  get isPlaying() {
    return this._isPlaying$.value;
  }

  addCallback(seconds: number, callback: () => void): void {
    this._callBackQueue.queue({
      seconds,
      callback,
    })
  }

  async play(videoId: string, time: number, callbacks: YouTubeCallbackDescriptor[] = []): Promise<void> {
    await this._youTubePlayer.loadVideoById(videoId);
    await new Promise<void>(resolve => {
      const listener = this._youTubePlayer.on('stateChange', ({data}) => {
        if (data === 1) {
          // @ts-ignore
          this._youTubePlayer.off(listener);
          resolve();
        }
      });
    });
    await this._youTubePlayer.seekTo(time, true);
    this._isPlaying$.next(true);
    callbacks.forEach(callback => {
      this._callBackQueue.queue(callback);
    })
  }

  async stop(): Promise<void> {
    if (this._isPlaying$.value) {
      await this._youTubePlayer.stopVideo();
      this._callBackQueue.clear();
      this._isPlaying$.next(false);
    }
  }

  async onStop(): Promise<unknown> {
    return this._isPlaying$.pipe(
      skip(1),
      filter(isPlaying => !isPlaying),
      take(1),
    ).toPromise();
  }
}
