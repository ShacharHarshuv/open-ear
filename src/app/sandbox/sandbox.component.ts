import { Component } from '@angular/core';
import PlayerFactory from 'youtube-player';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as PriorityQueue from 'js-priority-queue';
import { YouTubePlayerService } from '../services/you-tube-player.service';



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
