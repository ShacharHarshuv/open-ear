import { Component } from '@angular/core';
import { YouTubePlayerService } from '../services/players/you-tube-player.service';


@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {


  constructor(
    public youTubePlayerService: YouTubePlayerService,
  ) {

    this.youTubePlayerService.addCallback(51, () => {
      console.log('second chord');
    });
    this.youTubePlayerService.addCallback(60, async () => {
      await this.youTubePlayerService.stop();
    });
  }
}
