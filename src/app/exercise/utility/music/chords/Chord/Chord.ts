import { NoteType } from '../../notes/NoteType';
import { Interval } from '../../intervals/interval';
import { transpose } from '../../transpose';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { noteTypeToNote } from '../../notes/noteTypeToNote';
import * as _ from 'lodash';
import { getNoteOctave } from '../../notes/getNoteOctave';

export type ChordSymbol = `${NoteType}${'m' | ''}`;

export type ChordType = 'M' | 'm';

export enum TriadInversion {
  Fifth = 0,
  Octave = 1,
  Third = 2,
}

export class Chord {
  readonly root: NoteType = this._getChordRoot();
  readonly type: ChordType = this._getChordType();
  readonly intervals: Interval[] = this._getChordIntervals();
  readonly noteTypes: NoteType[] = this._getNoteTypes();

  constructor(public readonly symbol: ChordSymbol) {
  }

  private _getChordRoot(): NoteType {
    return this.symbol.match(/^[A-G](?:#|b|)/)?.[0] as NoteType;
  }

  private _getChordType(): ChordType {
    return this.symbol.includes('m') ? 'm' : 'M';
  }

  private _getChordIntervals(): Interval[] {
    const intervals = [Interval.Prima];
    switch (this.type) {
      case 'm':
        intervals.push(Interval.MinorThird);
        break;
      case 'M':
        intervals.push(Interval.MajorThird);
        break;
    }
    intervals.push(Interval.PerfectFifth);
    return intervals;
  }

  private _getNoteTypes(): NoteType[] {
    return this.intervals.map(interval => transpose(this.root, interval));
  }

  /**
   * octave is the octave of the soprano voice
   * */
  getVoicing({
               topVoicesInversion,
               withBass = true,
               octave = 4,
             }: {
    topVoicesInversion: number,
    withBass?: boolean,
    octave?: number
  }): Note[] {
    if (topVoicesInversion - 1 > this.noteTypes.length) {
      throw new Error(`Invalid inversion ${topVoicesInversion} from chord with notes ${this.noteTypes}`);
    }

    // first build the chord without inversions
    const rootNote: Note = noteTypeToNote(this.root, 1);
    let chordVoicing: Note[] = this.intervals.map(interval => transpose(rootNote, interval));

    while (topVoicesInversion) {
      const lowestNote: Note = chordVoicing.shift()!;
      chordVoicing.push(transpose(lowestNote, Interval.Octave));
      topVoicesInversion--;
    }

    //normalize to the right octave
    const highestVoice: Note = _.last(chordVoicing)!;
    const highestVoiceOctave = getNoteOctave(highestVoice);
    chordVoicing = transpose(chordVoicing, (octave - highestVoiceOctave) * Interval.Octave);

    if (withBass) {
      return [
        noteTypeToNote(this.root, 2),
        noteTypeToNote(this.root, 3),
        ...chordVoicing,
      ]
    }

    return chordVoicing;
  }
}
