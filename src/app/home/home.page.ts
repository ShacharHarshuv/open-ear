import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private _player: PlayerService,
  ) {
  }

  async onPlayClicked(): Promise<void> {
    await this._player.init();
    await this._player.playPart([
      {
        notes: 'G4',
        duration: '4n',
        time: 0,
      },
      {
        notes: 'E4',
        duration: '4n',
        time: '0:1:0',
      },
      {
        notes: 'E4',
        duration: '2n',
        time: '0:2:0',
      }
    ]);
  }
}
