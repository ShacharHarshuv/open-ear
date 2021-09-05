import { NoteType } from '../../notes/NoteType';
import { Interval } from '../../intervals/interval';
import { transpose } from '../../transpose';

export type ChordSymbol = `${NoteType}${'m' | ''}`;

export type ChordType = 'M' | 'm';

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
}
