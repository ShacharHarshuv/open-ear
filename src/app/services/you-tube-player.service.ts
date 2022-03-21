import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { YouTubePlayer } from 'youtube-player/dist/types';
import * as PriorityQueue from 'js-priority-queue';
import CallbackDescriptor = YouTubePlayerService.CallbackDescriptor;
import PlayerFactory from 'youtube-player';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BaseDestroyable } from '../shared/ts-utility';

namespace YouTubePlayerService {
  export interface CallbackDescriptor {
    seconds: number;
    callback: () => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class YouTubePlayerService extends BaseDestroyable {
  private _isPlaying$ = new BehaviorSubject(false);
  private _youTubePlayer: YouTubePlayer = this._getYouTubePlayer();
  private _callBackQueue = new PriorityQueue<CallbackDescriptor>({
    comparator: (a: CallbackDescriptor, b: CallbackDescriptor) => {
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
    console.log('creating player');
    return PlayerFactory(elm);
  }

  private _startTimeListener(): void {
    this._isPlaying$.pipe(
      switchMap((isPlaying) => {
        if (!isPlaying) {
          return NEVER;
        } else {
          return interval(1000);
        }
      }),
      takeUntil(this._destroy$),
    ).subscribe(async () => {
      if (!this._callBackQueue.length) {
        return;
      }
      const nextCallback = this._callBackQueue.peek();
      if (await this._youTubePlayer.getCurrentTime() > nextCallback.seconds - 0.5) {
        this._callBackQueue.dequeue();
        nextCallback.callback();
      }
    });
  }

  addCallback(seconds: number, callback: () => void): void {
    this._callBackQueue.queue({
      seconds,
      callback,
    })
  }

  async play(videoId: string, time: number): Promise<void> {
    console.log('loading video');
    await this._youTubePlayer.loadVideoById(videoId);
    await new Promise<void>(resolve => {
      const listener = this._youTubePlayer.on('stateChange', ({data}) => {
        console.log('listener', data);
        if (data === 1) {
          // @ts-ignore
          this._youTubePlayer.off(listener);
          resolve();
        }
      });
    });
    await this._youTubePlayer.seekTo(time, true);
    this._isPlaying$.next(true);
  }

  async stop(): Promise<void> {
    await this._youTubePlayer.stopVideo();
    this._isPlaying$.next(false);
  }
}
