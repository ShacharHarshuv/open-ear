import { NoteType } from '../../notes/NoteType';
import { transpose } from '../../transpose';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { noteTypeToNote } from '../../notes/noteTypeToNote';
import * as _ from 'lodash';
import { getNoteOctave } from '../../notes/getNoteOctave';
import { Interval } from '../../intervals/Interval';

export enum ChordType {
  Major = 'M',
  Minor = 'm',
  Diminished = 'dim',
  Dominant7th = '7',
  Major7th = 'maj7',
  Minor7th = 'm7',
  Sus4 = 'sus',
  Sus2 = 'sus2',
  Major6th = '6',
  Diminished7th = 'dim7',
  HalfDiminished7th = '7b5',
}

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
      const regexMatch = this._symbolOrConfig.match(/([A-G][#b]?)(m|dim|7|maj7|m7|sus|sus2|6|dim7|7b5)?$/);
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

  private static _chordTypeToIntervalList: Record<ChordType, Interval[]> = {
    [ChordType.Major]: [
      Interval.Prima,
      Interval.MajorThird,
      Interval.PerfectFifth,
    ],
    [ChordType.Minor]: [
      Interval.Prima,
      Interval.MinorThird,
      Interval.PerfectFifth,
    ],
    [ChordType.Diminished]: [
      Interval.Prima,
      Interval.MinorThird,
      Interval.DiminishedFifth,
    ],
    [ChordType.Dominant7th]: [
      Interval.Prima,
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MinorSeventh,
    ],

    [ChordType.Major7th]: [
      Interval.Prima,
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MajorSeventh,
    ],
    [ChordType.Minor7th]: [
      Interval.Prima,
      Interval.MinorThird,
      Interval.PerfectFifth,
      Interval.MinorSeventh,
    ],
    [ChordType.Sus4]: [
      Interval.Prima,
      Interval.PerfectFourth,
      Interval.PerfectFifth,
    ],
    [ChordType.Sus2]: [
      Interval.Prima,
      Interval.MajorSecond,
      Interval.PerfectFifth,
    ],
    [ChordType.Major6th]: [
      Interval.Prima,
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MajorSixth,
    ],
    [ChordType.Diminished7th]: [
      Interval.Prima,
      Interval.MinorThird,
      Interval.DiminishedFifth,
      Interval.DiminishedSeventh,
    ],
    [ChordType.HalfDiminished7th]: [
      Interval.Prima,
      Interval.MinorThird,
      Interval.DiminishedFifth,
      Interval.MinorSeventh,
    ],
  }

  private _getChordIntervals(): Interval[] {
    return Chord._chordTypeToIntervalList[this.type];
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
