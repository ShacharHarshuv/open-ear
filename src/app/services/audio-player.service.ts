import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private _currentPath: string | null = null;
  private _currentlyPlaying: HTMLAudioElement | null = null;

  async play(path: string): Promise<void> {
    if (this._currentlyPlaying) {
      this.stop();
    }

    if (this._currentPath !== path) {
      this._currentPath = path;
      this._currentlyPlaying = new Audio(path);
    }
    if (!this._currentlyPlaying) {
      throw new Error(`Expected _currentPlaying to be defined. Got ${this._currentlyPlaying}`);
    }
    await this._currentlyPlaying.play();
  }

  stop() {
    if (!this._currentlyPlaying) {
      return;
    }

    this._currentlyPlaying.pause();
    this._currentlyPlaying.currentTime = 0;
  }
}
