import { Injectable } from "@angular/core";
import * as Tone from "tone";
import {
  Sampler,
  Part,
  Transport
} from "tone";
import * as _ from "lodash";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import {
  NormalRange,
  Time,
  Seconds
} from "tone/Tone/core/type/Units";
import { Note } from "tone/Tone/core/type/NoteUnits";
import { NoteType } from "../exercise/utility/music/notes/NoteType";
import { noteTypeToNote } from "../exercise/utility/music/notes/noteTypeToNote";
import { timeoutAsPromise } from "../shared/ts-utility";

const DEFAULT_VELOCITY: number = 0.7;

// @ts-ignore
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

export interface NoteEvent {
  notes: Note[] | Note;
  /**
   * 4n by default
   * */
  duration?: Time;
  /**
   * If not provided, the time will be taken from last even time + last event duration
   * */
  time?: Time;
  velocity?: NormalRange;
}

// passing a number means to wait that many ms
export type PartToPlay = {
  partOrTime: NoteEvent[] | number;
  beforePlaying?: () => void;
  afterPlaying?: () => void;
  bpm?: number; // if provided, overrides the general settings for this part only
  /**
   * by the default, the part will play after the previous part in the array
   * Passing 0 means it will play together with the first part in the array,
   * Passing 1 means it will play after the first part in the array and so on
   * */
  playAfter?: number;
};

function getFileArrayBuffer(url: string): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'blob';
    request.onload = function () {
      const reader = new FileReader();
      reader.readAsArrayBuffer(request.response);
      reader.onload = function (e) {
        resolve(e.target?.result as ArrayBuffer);
      };
    };
    request.send();
  });
}

type PlayPartResponse = {
  expectedFinishTimeInSeconds: number;
  onPartFinishedPromise: Promise<void>;
};

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _instrumentPromise: Promise<Sampler> = this._getInstrument();
  private _isReady: boolean = false;
  private _currentlyPlaying = new Set<Part>();
  private _onPartFinished$Set = new Set<Subject<void>>();
  private _voicesToPlay: PartToPlay[] = [];
  private _onAllPartsFinished$ = new Subject<void>();
  // used for debugging
  private _lastPlayed: PartToPlay[] | null = null;

  constructor() {
    this._instrumentPromise.then(() => {
      this._isReady = true;
    });
  }

  get bpm(): number {
    return Tone.Transport.bpm.value;
  }

  get lastPlayed() {
    return this._lastPlayed;
  }

  get isReady(): boolean {
    return this._isReady;
  }

  async init() {
    await Tone.start();
    await Tone.loaded();
  }

  // Used this to wait for current playing parts to finish
  onAllPartsFinished(): Promise<void> {
    if (this._currentlyPlaying.size) {
      return this._onAllPartsFinished$.pipe(take(1)).toPromise();
    } else {
      return Promise.resolve();
    }
  }

  private static async _getSampleMap(): Promise<{
    [note: string]: AudioBuffer;
  }> {
    const sampleMap: { [note: string]: AudioBuffer } = {};
    const notesWithSamples: NoteType[] = ['A', 'C', 'D#', 'F#'];
    const octavesWithSamples: number[] = [1, 2, 3, 4, 5, 6, 7];
    for (let noteType of notesWithSamples) {
      for (let octaveNumber of octavesWithSamples) {
        const note = noteTypeToNote(noteType, octaveNumber);
        sampleMap[note] = await new Promise((resolve, reject) => {
          getFileArrayBuffer(
            `${
              location.origin
            }/samples/piano-mp3-velocity10/audio/${encodeURIComponent(
              note
            )}v10.mp3`
          ).then((arrayBuffer) => {
            audioCtx.decodeAudioData(arrayBuffer, resolve, reject);
          });
        });
      }
    }
    return sampleMap;
  }

  /**
   * If you need to play multiple parts in a row please use playMultipleParts to avoid event clashes in case of an event in them middle of the parts
   * */
  async playPart(noteEventList: NoteEvent[]): Promise<void> {
    this.stopAndClearQueue();
    await (
      await this._playPart(noteEventList)
    ).onPartFinishedPromise;
    this._onAllPartsFinished$.next();
    this._currentlyPlaying.clear();
  }

  async playMultipleParts(parts: PartToPlay[]): Promise<void> {
    this._lastPlayed = parts;

    // stop previous playMultipleParts if exists
    this.stopAndClearQueue();
    /*
     * Stop current call stuck so previous call to playMultipleParts can return.
     * Otherwise previous call will return playing this started, causing a clash in playing order
     * */
    await timeoutAsPromise();

    this._voicesToPlay = _.cloneDeep(parts);

    const playPartResponseList: PlayPartResponse[] = [
      {
        onPartFinishedPromise: Promise.resolve(),
        expectedFinishTimeInSeconds: 0,
      },
    ];
    // accessing the voice by index as it might be changed by stopAndClearQueue
    while (this._voicesToPlay.length) {
      const nextPart: PartToPlay = this._voicesToPlay.shift()!;
      const lastPartPlayResponse =
        playPartResponseList[
          nextPart.playAfter ?? playPartResponseList.length - 1
        ];
      lastPartPlayResponse.onPartFinishedPromise.then(() => {
        nextPart.beforePlaying?.();
      });
      if (typeof nextPart.partOrTime === 'number') {
        const delayInMs = nextPart.partOrTime;
        playPartResponseList.push({
          onPartFinishedPromise:
            lastPartPlayResponse.onPartFinishedPromise.then(() => {
              return timeoutAsPromise(delayInMs);
            }),
          expectedFinishTimeInSeconds:
            lastPartPlayResponse.expectedFinishTimeInSeconds + delayInMs / 1e3,
        });
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
        const playPartResponse = await this._playPart(
          nextPart.partOrTime,
          lastPartPlayResponse.expectedFinishTimeInSeconds
        );
        playPartResponse.onPartFinishedPromise.then(() => {
          nextPart.afterPlaying?.();
        });
        playPartResponseList.push(playPartResponse);
        if (nextPart.bpm) {
          this.setBpm(lastBpm);
        }
      }
    }
    await Promise.all(
      playPartResponseList.map((response) => response.onPartFinishedPromise)
    );

    this._onAllPartsFinished$.next();
    this._currentlyPlaying.clear();
  }

  stopAndClearQueue(): void {
    this._stopCurrentlyPlayingAndClearTransport();
    this._voicesToPlay = [];
  }

  setBpm(bpm: number): void {
    if (Tone.Transport.bpm.value !== bpm) {
      Tone.Transport.bpm.value = bpm;
    }
  }

  private _stopCurrentlyPlayingAndClearTransport(): void {
    Tone.Transport.stop();

    for (let currentlyPlaying of this._currentlyPlaying) {
      currentlyPlaying.dispose();
    }
    this._currentlyPlaying.clear();

    // clearing all existing events on the Transport
    Transport.cancel(0);

    // Signal finish of all playing parts
    for (let onPartFinished$ of this._onPartFinished$Set) {
      onPartFinished$.next();
    }
    this._onPartFinished$Set.clear();
  }

  // returns the expected finish time in seconds
  private async _playPart(
    noteEventList: NoteEvent[],
    startTimeInSeconds: number = 0
  ): Promise<PlayPartResponse> {
    const instrument = await this._instrumentPromise;
    let lastTime: Time = 0;
    const normalizedNoteEventList: Required<NoteEvent>[] = noteEventList.map(
      (noteEvent: NoteEvent): Required<NoteEvent> => {
        const normalizedNoteEvent: Required<NoteEvent> = {
          time: lastTime,
          velocity: DEFAULT_VELOCITY,
          duration: '4n',
          ...noteEvent,
        };
        lastTime =
          Tone.Time(normalizedNoteEvent.time).toSeconds() +
          Tone.Time(normalizedNoteEvent.duration).toSeconds();
        return normalizedNoteEvent;
      }
    );

    const currentlyPlaying = new Tone.Part<Required<NoteEvent>>(
      (time, noteEvent: Required<NoteEvent>) => {
        instrument.triggerAttackRelease(
          noteEvent.notes,
          noteEvent.duration,
          time,
          noteEvent.velocity
        );
      },
      normalizedNoteEventList
    ).start(startTimeInSeconds);
    this._currentlyPlaying.add(currentlyPlaying);

    const stoppingTime: Seconds =
      startTimeInSeconds +
      _.max(
        normalizedNoteEventList.map(
          (noteEvent) =>
            Tone.Time(noteEvent.time).toSeconds() +
            Tone.Time(noteEvent.duration).toSeconds()
        )
      )!;

    const onPartFinished$ = new Subject<void>();
    this._onPartFinished$Set.add(onPartFinished$);

    Tone.Transport.schedule(() => {
      onPartFinished$.next();
      this._onPartFinished$Set.delete(onPartFinished$);
    }, stoppingTime);
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
    }

    return {
      expectedFinishTimeInSeconds: stoppingTime,
      onPartFinishedPromise: onPartFinished$.pipe(take(1)).toPromise(),
    };
  }

  private async _getInstrument(): Promise<Sampler> {
    return new Sampler({
      urls: await PlayerService._getSampleMap(),
      release: 1,
    }).toDestination();
  }
}
