import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  NEVER,
} from 'rxjs';
import { YouTubePlayer } from 'youtube-player/dist/types';
import * as PriorityQueue from 'js-priority-queue';
import PlayerFactory from 'youtube-player';
import {
  filter,
  skip,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { BaseDestroyable } from '../shared/ts-utility';
import * as _ from 'lodash';

export interface YouTubeCallbackDescriptor {
  seconds: number;
  callback: () => void;
}

const TIME_STAMP_POLLING: number = 200;

@Injectable({
  providedIn: 'root'
})
export class YouTubePlayerService extends BaseDestroyable {
  private _isVideoLoading: boolean = false;
  private _currentlyLoadedVideoId: string | null = null;
  private _onCurrentVideoLoaded: Promise<void> = Promise.resolve();
  private _isPlaying$ = new BehaviorSubject(false);
  private _youTubePlayer: YouTubePlayer = this._getYouTubePlayer();
  private _callBackQueue = new PriorityQueue<YouTubeCallbackDescriptor>({
    comparator: (a: YouTubeCallbackDescriptor, b: YouTubeCallbackDescriptor) => {
      return a.seconds - b.seconds;
    }
  });

  get isVideoLoading(): boolean {
    return this._isVideoLoading;
  }

  get onCurrentVideoLoaded(): Promise<void> {
    return this._onCurrentVideoLoaded;
  }

  get isPlaying() {
    return this._isPlaying$.value;
  }

  constructor() {
    super();
    this._startTimeListener();

    // this helps to sync the chords faster
    document.addEventListener('click', async () => {
      console.log(_.round(await this._youTubePlayer.getCurrentTime(), 2) - 0.3); // compensating for delay
    })
  }

  /**
   * This method will not load the video if it's already loaded
   * */
  async loadVideoById(videoId: string): Promise<void> {
    if (this._currentlyLoadedVideoId !== videoId) {
      this._currentlyLoadedVideoId = videoId;
      this._isVideoLoading = true;
      this._onCurrentVideoLoaded = this._youTubePlayer.loadVideoById(videoId)
        .then(() => {
          return new Promise<void>(resolve => {
            const listener = this._youTubePlayer.on('stateChange', ({data}) => {
              if (data === 1) {
                // @ts-ignore
                this._youTubePlayer.off(listener);
                resolve();
              }
            });
          });
        })
        .then(() => {
          this._youTubePlayer.pauseVideo(); // we don't always want it to start playing immediately
        })
        .then(() => {
          this._isVideoLoading = false;
        })
    }
    await this._onCurrentVideoLoaded;
  }

  addCallback(seconds: number, callback: () => void): void {
    this._callBackQueue.queue({
      seconds,
      callback,
    })
  }

  async play(videoId: string, time: number, callbacks: YouTubeCallbackDescriptor[] = []): Promise<void> {
    console.log('play', videoId, time);
    if (videoId !== this._currentlyLoadedVideoId) {
      await this.loadVideoById(videoId);
    }
    await this._youTubePlayer.seekTo(time, true);
    await this._youTubePlayer.playVideo();
    this._isPlaying$.next(true);
    callbacks.forEach(callback => {
      this._callBackQueue.queue(callback);
    })
  }

  async stop(): Promise<void> {
    if (this._isPlaying$.value) {
      await this._youTubePlayer.pauseVideo(); // used instead of stopVideo to avoid resetting of the play position
      this._callBackQueue.clear();
      this._isPlaying$.next(false);
    }
  }

  async onStop(): Promise<unknown> {
    if (this._isPlaying$.value) {
      return this._isPlaying$.pipe(
        filter(isPlaying => !isPlaying),
        take(1),
      ).toPromise();
    } else {
      return Promise.resolve();
    }
  }

  private _getYouTubePlayer(): YouTubePlayer {
    const elm = document.createElement('div');
    // Expose the following code for debugging purposes
    // elm.style['position'] = 'absolute';
    // elm.style['top'] = '0';
    // elm.style['width'] = '100px';
    // elm.style['height'] = '100px';
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
      const currentTime = await this._youTubePlayer.getCurrentTime();
      if (currentTime > nextCallback.seconds - (TIME_STAMP_POLLING / 2000)) {
        this._callBackQueue.dequeue();
        nextCallback.callback();
      }
    });
  }
}
