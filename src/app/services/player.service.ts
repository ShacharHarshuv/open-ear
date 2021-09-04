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

const DEFAULT_VELOCITY: number = 0.7;

export interface NoteEvent {
  notes: Note[] | Note,
  duration: Time,
  time: Time,
  velocity?: NormalRange,
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _instrument: Sampler = this._getInstrument();
  private _currentlyPlaying: Part | null = null;
  private _currentlyPlayingPartFinishedSchedulerId: number | null = null;
  private _onPartFinished$ = new Subject<void>();

  constructor() {
  }

  async init() {
    await Tone.start();
    await Tone.loaded();
  }

  private _stopCurrentlyPlaying(): void {
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

  private _getInstrument(): Sampler {
    return new Sampler({
      urls: {
        'C4': 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
        'A4': 'A4.mp3',
      },
      release: 1,
      baseUrl: `${location.origin}/assets/samples/piano/`,
    }).toDestination();
  }

  async playPart(noteEventList: NoteEvent[]): Promise<void> {
    this._stopCurrentlyPlaying();

    this._currentlyPlaying = new Tone.Part<NoteEvent>(((time, noteEvent: NoteEvent) => {
      this._instrument.triggerAttackRelease(noteEvent.notes, noteEvent.duration, time, noteEvent.velocity || DEFAULT_VELOCITY);
    }), noteEventList).start(0);

    const stoppingTime: Seconds = _.max(noteEventList.map(noteEvent => Tone.Time(noteEvent.time).toSeconds() + Tone.Time(noteEvent.duration).toSeconds()))!;

    this._currentlyPlayingPartFinishedSchedulerId = Tone.Transport.schedule(() => {
      this._stopCurrentlyPlaying();
    }, stoppingTime);
    Tone.Transport.start();

    return this._onPartFinished$.pipe(take(1)).toPromise();
  }
}
