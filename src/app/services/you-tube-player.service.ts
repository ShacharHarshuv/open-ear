import { computed, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import * as PriorityQueue from 'js-priority-queue';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import PlayerFactory from 'youtube-player';

export interface YouTubeCallbackDescriptor {
  seconds: number;
  callback: () => void;
}

const TIME_STAMP_POLLING: number = 200;

@Injectable({
  providedIn: 'root',
})
export class YouTubePlayerService {
  private _elm = this._getHostElement();
  private _isVideoLoading: boolean = false;
  private _currentlyLoadedVideoId: string | null = null;
  private _onCurrentVideoLoaded: Promise<void> = Promise.resolve();
  private _isPlaying$ = new BehaviorSubject(false);
  private _youTubePlayer = this._getYouTubePlayer();
  private _callBackQueue = new PriorityQueue<YouTubeCallbackDescriptor>({
    comparator: (
      a: YouTubeCallbackDescriptor,
      b: YouTubeCallbackDescriptor,
    ) => {
      return a.seconds - b.seconds;
    },
  });
  private readonly _alertController = inject(AlertController);
  private readonly _platform = inject(Platform);
  private readonly _toastController = inject(ToastController);

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
    this._startTimeListener();
  }

  /**
   * This method will not load the video if it's already loaded
   * */
  async loadVideoById(
    videoId: string,
    onAutoplayBlocked: () => void,
  ): Promise<void> {
    if (this._currentlyLoadedVideoId !== videoId) {
      this._currentlyLoadedVideoId = videoId;
      this._isVideoLoading = true;
      this._onCurrentVideoLoaded = this._youTubePlayer()
        .loadVideoById(videoId)
        .then(() => {
          return new Promise<void>((resolve) => {
            const listener = this._youTubePlayer().on(
              'stateChange',
              ({ data }) => {
                // todo: remove
                this._toastController
                  .create({
                    message: `stateChange: ${data}`,
                    duration: 1000,
                  })
                  .then((toast) => toast.present());
                if (data === 1) {
                  // @ts-ignore
                  this._youTubePlayer().off(listener);
                  resolve();
                }
                if (data === -1) {
                  // this._alertController
                  //   .create({
                  //     message: 'Test popup',
                  //     subHeader: 'Test popup',
                  //     buttons: ['OK'],
                  //   })
                  //   .then((alert) => alert.present());
                  onAutoplayBlocked();
                }
              },
            );
          });
        })
        .then(() => {
          this._youTubePlayer().pauseVideo(); // we don't always want it to start playing immediately
        })
        .then(() => {
          this._isVideoLoading = false;
        });
    }
    await this._onCurrentVideoLoaded;
  }

  addCallback(seconds: number, callback: () => void): void {
    this._callBackQueue.queue({
      seconds,
      callback,
    });
  }

  async play(
    videoId: string,
    time: number,
    callbacks: YouTubeCallbackDescriptor[] = [],
    onAutoplayBlocked: () => void,
  ): Promise<void> {
    console.log('play', videoId, time);
    if (videoId !== this._currentlyLoadedVideoId) {
      await this.loadVideoById(videoId, onAutoplayBlocked);
    }
    await this._onCurrentVideoLoaded; // it's possible loadVideoById was invoked by another function but video is not loaded yet
    await this._youTubePlayer().seekTo(time, true);
    await this._youTubePlayer().playVideo();
    this._isPlaying$.next(true);
    callbacks.forEach((callback) => {
      this._callBackQueue.queue(callback);
    });
  }

  async stop(): Promise<void> {
    if (this._isPlaying$.value) {
      await this._youTubePlayer().pauseVideo(); // used instead of stopVideo to avoid resetting of the play position
      this._callBackQueue.clear();
      this._isPlaying$.next(false);
    }
  }

  async onStop(): Promise<unknown> {
    if (this._isPlaying$.value) {
      return this._isPlaying$
        .pipe(
          filter((isPlaying) => !isPlaying),
          take(1),
        )
        .toPromise();
    } else {
      return Promise.resolve();
    }
  }

  private _getYouTubePlayer() {
    return computed(() => PlayerFactory(this._elm()));
  }

  private _startTimeListener(): void {
    this._isPlaying$
      .pipe(
        switchMap((isPlaying) => {
          if (!isPlaying) {
            return NEVER;
          } else {
            return interval(TIME_STAMP_POLLING);
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe(async () => {
        if (!this._callBackQueue.length) {
          return;
        }
        const nextCallback = this._callBackQueue.peek();
        const currentTime = await this._youTubePlayer().getCurrentTime();
        if (currentTime > nextCallback.seconds - TIME_STAMP_POLLING / 2000) {
          this._callBackQueue.dequeue();
          nextCallback.callback();
        }
      });
  }

  private _getHostElement() {
    return computed(() => {
      const elm = document.createElement('div');
      let host =
        document.querySelector<HTMLElement>('.video-container') ??
        document.body;

      // if (!elm) {
      //   console.warn('Video container not found');

      //   elm = document.createElement('div');
      // }
      // Expose the following code for debugging purposes
      // elm.style['position'] = 'absolute';
      // elm.style['top'] = '0';
      elm.style['width'] = '70%';
      elm.style['height'] = '150px';
      host.appendChild(elm);
      return elm;
    });
  }
}
