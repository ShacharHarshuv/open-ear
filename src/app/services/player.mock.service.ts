import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { NoteEvent, PartToPlay, PlayerService } from './player.service';
import { Provider } from '@angular/core';

export class PlayerMockService implements PublicMembers<PlayerService> {
  private _bpm: number = 120;

  constructor() {
  }

  get bpm(): number {
    return this._bpm;
  }

  async init(): Promise<void> {
  }

  async playMultipleParts(parts: PartToPlay[]): Promise<void> {
  }

  async playPart(noteEventList: NoteEvent[]): Promise<void> {
  }

  setBpm(bpm: number): void {
    this._bpm = bpm;
  }

  static providers: Provider[] = [
    PlayerMockService,
    {
      provide: PlayerService,
      useExisting: PlayerMockService,
    }
  ]

}
