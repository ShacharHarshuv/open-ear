import { NoteType } from '../../notes/NoteType';
import { transpose } from '../../transpose';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { noteTypeToNote } from '../../notes/noteTypeToNote';
import * as _ from 'lodash';
import { getNoteOctave } from '../../notes/getNoteOctave';
import { Interval } from '../../intervals/Interval';
import {
  ChordType,
  chordTypeConfigMap,
} from './ChordType';

export type ChordSymbol = `${NoteType}${Exclude<ChordType, 'M'> | ''}`;

export enum TriadInversion {
  Fifth = 0,
  Octave = 1,
  Third = 2,
}

export enum Direction {
  Up = 1,
  Down = -1,
}

const chordSymbolRegex = new RegExp(`([A-G][#b]?)(${Object.keys(chordTypeConfigMap).join('|')})?$`);

export class Chord {
  readonly root: NoteType;
  readonly type: ChordType;
  readonly symbol: ChordSymbol;
  readonly intervals: Interval[];
  readonly noteTypes: NoteType[];

  constructor(private readonly _symbolOrConfig: ChordSymbol | {
    root: NoteType,
    type: ChordType,
  }) {
    if (typeof this._symbolOrConfig === 'string') {
      const regexMatch = this._symbolOrConfig.match(chordSymbolRegex);
      if (!regexMatch) {
        throw new Error(`${this._symbolOrConfig} is not a valid chord symbol`);
      }
      this.root = regexMatch[1] as NoteType;
      this.type = (regexMatch[2] || ChordType.Major) as ChordType;
      this.symbol = this._symbolOrConfig;
    } else {
      this.root = this._symbolOrConfig.root;
      this.type = this._symbolOrConfig.type;
      this.symbol = `${this.root}${this.type === ChordType.Major ? '' : this.type}` as ChordSymbol;
    }
    this.intervals = this._getChordIntervals();
    this.noteTypes = this._getNoteTypes();
  }

  private _getChordIntervals(): Interval[] {
    return chordTypeConfigMap[this.type].intervalList;
  }

  private _getNoteTypes(): NoteType[] {
    return this.intervals.map(interval => transpose(this.root, interval));
  }

  getBass(): Note[] {
    return [
      noteTypeToNote(this.root, 2),
      noteTypeToNote(this.root, 3),
    ];
  }

  getVoicing({
    topVoicesInversion,
    withBass = true,
    octave = 4,
  }: {
    topVoicesInversion: number,
    withBass?: boolean,
    /**
     * The octave of the soprano voice
     * */
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
        ...this.getBass(),
        ...chordVoicing,
      ]
    }

    return chordVoicing;
  }

  static invertVoicing(voicing: Note[], direction: Direction): Note[] {
    if (_.isEmpty(voicing)) {
      return [];
    }
    const invertedVoicing = [...voicing];
    if (direction === Direction.Up) {
      const bottomNote: Note = invertedVoicing.shift()!;
      invertedVoicing.push(transpose(bottomNote, Interval.Octave));
    } else {
      const topNote: Note = invertedVoicing.pop()!;
      invertedVoicing.unshift(transpose(topNote, -Interval.Octave))
    }
    return invertedVoicing;
  }
}
