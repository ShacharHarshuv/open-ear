import { NoteEvent, PlayerPart } from '../player.service';
import { Part, Sampler, Transport } from 'tone';
import * as Tone from 'tone';
import { Seconds, Time } from 'tone/Tone/core/type/Units';
import * as _ from 'lodash';
import { NoteType } from '../../exercise/utility/music/notes/NoteType';
import { noteTypeToNote } from '../../exercise/utility/music/notes/noteTypeToNote';
import { IPlayer } from './IPlayer';

const DEFAULT_VELOCITY: number = 0.7;

// @ts-ignore
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// passing a number means to wait that many ms

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
  })
}
export type NotePlayerPart = NoteEvent[];

export class NotesPlayer implements IPlayer<NotePlayerPart> {
  private _instrumentPromise: Promise<Sampler> = this._getInstrument();
  private _currentlyPlaying: Part | null = null;
  private _currentlyPlayingPartFinishedSchedulerId: number | null = null;

  async init(): Promise<void> {
    await Tone.start();
    await Tone.loaded();
  }

  isValidPart(part: PlayerPart): part is NotePlayerPart {
    return true; // todo: rewrite this method
  }

  async playPart(part: NotePlayerPart, onPartFinished: () => void): Promise<void> {
    const instrument = await this._instrumentPromise;
    let lastTime: Time = 0;
    const normalizedNoteEventList: Required<NoteEvent>[] = part.map((noteEvent: NoteEvent): Required<NoteEvent> => {
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
      instrument.triggerAttackRelease(noteEvent.notes, noteEvent.duration, time, noteEvent.velocity);
    }), normalizedNoteEventList).start(0);

    const stoppingTime: Seconds = _.max(normalizedNoteEventList.map(noteEvent => Tone.Time(noteEvent.time).toSeconds() + Tone.Time(noteEvent.duration).toSeconds()))!;

    this._currentlyPlayingPartFinishedSchedulerId = Tone.Transport.schedule(() => {
      onPartFinished();
    }, stoppingTime);
    Tone.Transport.start();
  }

  async stop(): Promise<void> {
    Tone.Transport.stop();

    if (this._currentlyPlaying) {
      this._currentlyPlaying.dispose();
      this._currentlyPlaying = null;
    }

    if (!_.isNil(this._currentlyPlayingPartFinishedSchedulerId)) {
      Transport.clear(this._currentlyPlayingPartFinishedSchedulerId);
    }
  }

  private async _getInstrument(): Promise<Sampler> {
    return new Sampler({
      urls: await NotesPlayer._getSampleMap(),
      release: 1,
    }).toDestination();
  }

  private static async _getSampleMap(): Promise<{ [note: string]: AudioBuffer }> {
    const sampleMap: { [note: string]: AudioBuffer } = {};
    const notesWithSamples: NoteType[] = ['A', 'C', 'D#', 'F#'];
    const octavesWithSamples: number[] = [1, 2, 3, 4, 5, 6, 7];
    for (let noteType of notesWithSamples) {
      for (let octaveNumber of octavesWithSamples) {
        const note = noteTypeToNote(noteType, octaveNumber);
        sampleMap[note] = await new Promise((resolve, reject) => {
          getFileArrayBuffer(`${location.origin}/samples/piano-mp3-velocity10/audio/${encodeURIComponent(note)}v10.mp3`).then(arrayBuffer => {
            audioCtx.decodeAudioData(
              arrayBuffer,
              resolve,
              reject,
            );
          })
        });
      }
    }
    return sampleMap;
  }
}
