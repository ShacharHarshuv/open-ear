import { NoteType } from '../../notes/NoteType';

export type ChordSymbol = `${NoteType}${'m' | ''}`;

export type ChordType = 'M' | 'm';

export class Chord {
  readonly root: NoteType = this._getChordRoot();
  readonly type: ChordType = this._getChordType();

  constructor(public readonly symbol: ChordSymbol) {
  }

  private _getChordRoot(): NoteType {
    return this.symbol.match(/^[A-G](?:#|b|)/)?.[0] as NoteType;
  }

  private _getChordType(): ChordType {
    return this.symbol.includes('m') ? 'm' : 'M';
  }
}
