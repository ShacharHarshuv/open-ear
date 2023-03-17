import { Injectable } from "@angular/core";
import * as Tone from "tone";
import { Synth } from "tone";
import { Note } from "tone/Tone/core/type/NoteUnits";

@Injectable({
  providedIn: 'root',
})
export class DronePlayerService {
  private _drone: Synth = this._getInstrument();
  private _lastNote: Note | null = null;

  constructor() {}

  private _getInstrument(): Synth {
    return new Tone.Synth({
      oscillator: {
        type: 'triangle',
      },
    }).toDestination();
  }

  startDrone(note: Note): void {
    if (this._lastNote === note) {
      return;
    }
    this.stopDrone();
    this._lastNote = note;
    this._drone.triggerAttack(note);
  }

  stopDrone(): void {
    this._lastNote = null;
    this._drone.triggerRelease();
  }
}
