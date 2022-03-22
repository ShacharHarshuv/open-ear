import { Injectable } from '@angular/core';
import * as Tone from 'tone';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NormalRange, Time, } from 'tone/Tone/core/type/Units';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { timeoutAsPromise } from '../shared/ts-utility';
import { NotePlayerPart, NotesPlayer } from './players/notes-player';
import { IPlayer } from './players/IPlayer';
import { YouTubePlayerPart } from './players/you-tube-player.service';

export interface NoteEvent {
  notes: Note[] | Note,
  /**
   * 4n by default
   * */
  duration?: Time,
  /**
   * If not provided, the time will be taken from last even time + last event duration
   * */
  time?: Time,
  velocity?: NormalRange,
}

export type PlayerPart = NotePlayerPart | YouTubePlayerPart;

export type PartToPlay = {
  partOrTime: PlayerPart | number,
  beforePlaying?: () => void,
  afterPlaying?: () => void,
  bpm?: number; // if provided, overrides the general settings for this part only
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _players: IPlayer<PlayerPart>[] = [new NotesPlayer()]; // todo: add youtube player
  private _onPartFinished$ = new Subject<void>();
  private _partsToPlay: PartToPlay[] = [];

  get bpm(): number {
    return Tone.Transport.bpm.value;
  }

  async init() {
    for (let player of this._players) {
      await player.init?.();
    }
  }

  /**
   * If you need to play multiple parts in a row please use playMultipleParts to avoid event clashes in case of an event in them middle of the parts
   * */
  async playPart(noteEventList: NoteEvent[]): Promise<void> {
    this._partsToPlay = [];
    await this._stop();
    await this._playPart(noteEventList);
  }

  async playMultipleParts(parts: PartToPlay[]): Promise<void> {
    // stop previous playMultipleParts if exists
    this._partsToPlay = [];
    await this._stop();
    /*
    * Stop current call stuck so previous call to playMultipleParts can return.
    * Otherwise previous call will return playing this started, causing a clash in playing order
    * */
    await timeoutAsPromise();

    this._partsToPlay = _.clone(parts);

    while (this._partsToPlay.length) {
      const nextPart: PartToPlay = this._partsToPlay.shift()!;
      nextPart.beforePlaying?.();
      if (typeof nextPart.partOrTime === 'number') {
        await timeoutAsPromise(nextPart.partOrTime);
      } else {
        /*
        * This can be stopped in the following cases:
        * - Part was finished (thus playing was stopped and transport cleared)
        * - public playPart was called (thus playing was stopped and transport cleared)
        * - playMultipleParts was called (thus playing was stopped and transport cleared)
        * */
        const lastBpm = this.bpm;
        if (nextPart.bpm && lastBpm != nextPart.bpm) {
          this.setBpm(nextPart.bpm);
        }
        await this._playPart(nextPart.partOrTime);
        if (nextPart.bpm) {
          this.setBpm(lastBpm);
        }
      }
      nextPart.afterPlaying?.();
    }
  }

  private async _stop(): Promise<void> {
    for (let player of this._players) {
      await player.stop();
    }

    this._onPartFinished$.next();
  }

  private async _playPart(part: PlayerPart): Promise<void> {
    for (let player of this._players) {
      if (player.isValidPart(part)) {
        await player.playPart(part, () => {
          this._stop();
        });
        break;
      }
    }

    return this._onPartFinished$.pipe(
      take(1),
    ).toPromise();
  }

  setBpm(bpm: number): void {
    if (Tone.Transport.bpm.value !== bpm) {
      Tone.Transport.bpm.value = bpm;
    }
  }
}
