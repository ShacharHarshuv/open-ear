import { Injectable } from '@angular/core';
import * as Tone from 'tone';
import {
  Sampler,
  Part,
  Transport
} from 'tone';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  NormalRange,
  Time,
  Seconds,
} from 'tone/Tone/core/type/Units';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from '../exercise/utility/music/notes/NoteType';
import { noteTypeToNote } from '../exercise/utility/music/notes/noteTypeToNote';
import { timeoutAsPromise } from '../shared/ts-utility';

const DEFAULT_VELOCITY: number = 0.7;

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

// passing a number means to wait that many ms
export type PartToPlay = {
  partOrTime: NoteEvent[] | number,
  beforePlaying?: () => void,
  afterPlaying?: () => void,
  bpm?: number; // if provided, overrides the general settings for this part only
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _instrument: Sampler = this._getInstrument();
  private _currentlyPlaying: Part | null = null;
  private _currentlyPlayingPartFinishedSchedulerId: number | null = null;
  private _onPartFinished$ = new Subject<void>();
  private _partsToPlay: PartToPlay[] = [];

  get bpm(): number {
    return Tone.Transport.bpm.value;
  }

  constructor() {
  }

  async init() {
    await Tone.start();
    await Tone.loaded();
  }

  private static _getSampleMap(): { [note: string]: string } {
    const sampleMap: { [note: string]: string } = {};
    const notesWithSamples: NoteType[] = ['A', 'C', 'D#', 'F#'];
    const octavesWithSamples: number[] = [1, 2, 3, 4, 5, 6, 7];
    for (let noteType of notesWithSamples) {
      for (let octaveNumber of octavesWithSamples) {
        const note = noteTypeToNote(noteType, octaveNumber);
        sampleMap[note] = encodeURIComponent(`${note}v10.mp3`);
      }
    }
    return sampleMap;
  }

  /**
   * If you need to play multiple parts in a row please use playMultipleParts to avoid event clashes in case of an event in them middle of the parts
   * */
  async playPart(noteEventList: NoteEvent[]): Promise<void> {
    this._partsToPlay = [];
    this._stopCurrentlyPlayingAndClearTransport();
    await this._playPart(noteEventList);
  }

  async playMultipleParts(parts: PartToPlay[]): Promise<void> {
    // stop previous playMultipleParts if exists
    this._partsToPlay = [];
    this._stopCurrentlyPlayingAndClearTransport();
    /*
    * Stop current call stuck so previous call to playMultipleParts can return.
    * Otherwise previous call will return playing this started, causing a clash in playing order
    * */
    await timeoutAsPromise();

    this._partsToPlay = _.clone(parts);

    while(this._partsToPlay.length) {
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
          console.log('set bpm');
        }
        await this._playPart(nextPart.partOrTime);
        if (nextPart.bpm) {
          this.setBpm(lastBpm);
          console.log('restore bpm');
        }
      }
      nextPart.afterPlaying?.();
    }
  }

  private _stopCurrentlyPlayingAndClearTransport(): void {
    Tone.Transport.stop();

    if (this._currentlyPlaying) {
      this._currentlyPlaying.dispose();
      this._currentlyPlaying = null;
    }

    if (!_.isNil(this._currentlyPlayingPartFinishedSchedulerId)) {
      Transport.clear(this._currentlyPlayingPartFinishedSchedulerId);
    }

    this._onPartFinished$.next();
  }

  private async _playPart(noteEventList: NoteEvent[]) {
    let lastTime: Time = 0;
    const normalizedNoteEventList: Required<NoteEvent>[] = noteEventList.map((noteEvent: NoteEvent): Required<NoteEvent> => {
      const normalizedNoteEvent: Required<NoteEvent> = {
        time: lastTime,
        velocity: DEFAULT_VELOCITY,
        duration: '4n',
        ...noteEvent,
      }
      lastTime = Tone.Time(normalizedNoteEvent.time).toSeconds() + Tone.Time(normalizedNoteEvent.duration).toSeconds();
      return normalizedNoteEvent;
    });

    this._currentlyPlaying = new Tone.Part<Required<NoteEvent>>(((time, noteEvent: Required<NoteEvent>) => {
      this._instrument.triggerAttackRelease(noteEvent.notes, noteEvent.duration, time, noteEvent.velocity);
    }), normalizedNoteEventList).start(0);

    const stoppingTime: Seconds = _.max(normalizedNoteEventList.map(noteEvent => Tone.Time(noteEvent.time).toSeconds() + Tone.Time(noteEvent.duration).toSeconds()))!;

    this._currentlyPlayingPartFinishedSchedulerId = Tone.Transport.schedule(() => {
      this._stopCurrentlyPlayingAndClearTransport();
    }, stoppingTime);
    Tone.Transport.start();

    return this._onPartFinished$
      .pipe(
        take(1),
      ).toPromise();
  }

  private _getInstrument(): Sampler {
    return new Sampler({
      urls: PlayerService._getSampleMap(),
      release: 1,
      baseUrl: `${location.origin}/samples/piano-mp3-velocity10/audio/`,
    }).toDestination();
  }

  setBpm(bpm: number): void {
    if (Tone.Transport.bpm.value !== bpm) {
      Tone.Transport.bpm.value = bpm;
    }
  }
}
