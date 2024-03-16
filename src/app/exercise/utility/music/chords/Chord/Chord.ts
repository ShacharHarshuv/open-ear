import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { Interval } from '../../intervals/Interval';
import { NoteType } from '../../notes/NoteType';
import { getNoteOctave } from '../../notes/getNoteOctave';
import { noteTypeToNote } from '../../notes/noteTypeToNote';
import { expandedScaleDegreeToChromaticDegree } from '../../scale-degrees';
import { transpose } from '../../transpose';
import { ChordType, chordTypeConfigMap } from './ChordType';

export type ChordSymbol = `${NoteType}${Exclude<ChordType, 'M'> | ''}${
  | ''
  | `/${NoteType}`}`;

export enum TriadPosition {
  Fifth = 0,
  Octave = 1,
  Third = 2,
}

export enum Direction {
  Up = 1,
  Down = -1,
}

const noteTypeRegex = '[A-G][#b]?';
const chordSymbolRegex = new RegExp(
  `(${noteTypeRegex}?)(${Object.keys(chordTypeConfigMap)
    .map(_.escapeRegExp)
    .join('|')})?(?:\/(${noteTypeRegex}))?$`,
);

export class Chord {
  private readonly _intervals: Interval[];
  readonly root: NoteType;
  readonly type: ChordType;
  readonly symbol: ChordSymbol;
  readonly noteTypes: NoteType[];
  readonly bass: NoteType;

  constructor(
    private readonly _symbolOrConfig:
      | ChordSymbol
      | {
          root: NoteType;
          type: ChordType;
          bass?: NoteType;
        },
  ) {
    if (typeof this._symbolOrConfig === 'string') {
      const regexMatch = this._symbolOrConfig.match(chordSymbolRegex);
      if (!regexMatch) {
        throw new Error(`${this._symbolOrConfig} is not a valid chord symbol`);
      }
      this.root = regexMatch[1] as NoteType;
      this.type = (regexMatch[2] || ChordType.Major) as ChordType;
      this.bass = (regexMatch[3] as NoteType) ?? this.root;
      this.symbol = this._symbolOrConfig;
    } else {
      this.root = this._symbolOrConfig.root;
      this.type = this._symbolOrConfig.type;
      this.symbol = `${this.root}${
        this.type === ChordType.Major ? '' : this.type
      }` as ChordSymbol;
      this.bass = this._symbolOrConfig.bass ?? this.root;
    }
    this._intervals = this._getChordIntervals();
    this.noteTypes = this._getNoteTypes();
  }

  private _getChordIntervals(): Interval[] {
    return [
      Interval.Unison,
      ...chordTypeConfigMap[this.type].scaleDegreeList.map((scaleDegree) => {
        return expandedScaleDegreeToChromaticDegree[scaleDegree] - 1;
      }),
    ];
  }

  private _getNoteTypes(): NoteType[] {
    return this._intervals.map((interval) => transpose(this.root, interval));
  }

  getBass(): Note[] {
    return [noteTypeToNote(this.bass, 2), noteTypeToNote(this.bass, 3)];
  }

  getVoicing({
    position,
    withBass = true,
    octave = 4,
  }: {
    position: number;
    withBass?: boolean;
    /**
     * The octave of the soprano voice
     * */
    octave?: number;
  }): Note[] {
    if (position - 1 > this.noteTypes.length) {
      throw new Error(
        `Invalid inversion ${position} from chord with notes ${this.noteTypes}`,
      );
    }

    // first build the chord without inversions
    const rootNote: Note = noteTypeToNote(this.root, 1);
    let chordVoicing: Note[] = this._intervals.map((interval) =>
      transpose(rootNote, interval),
    );

    while (position) {
      const lowestNote: Note = chordVoicing.shift()!;
      chordVoicing.push(transpose(lowestNote, Interval.Octave));
      position--;
    }

    //normalize to the right octave
    const highestVoice: Note = _.last(chordVoicing)!;
    const highestVoiceOctave = getNoteOctave(highestVoice);
    chordVoicing = transpose(
      chordVoicing,
      (octave - highestVoiceOctave) * Interval.Octave,
    );

    if (withBass) {
      return [...this.getBass(), ...chordVoicing];
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
      invertedVoicing.unshift(transpose(topNote, -Interval.Octave));
    }
    return invertedVoicing;
  }
}
