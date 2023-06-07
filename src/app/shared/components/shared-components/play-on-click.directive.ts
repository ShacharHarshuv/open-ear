import { Directive, HostListener, Input, inject } from '@angular/core';
import { NoteEvent, PlayerService } from '../../../services/player.service';
import { OneOrMany } from '../../ts-utility';
import { NoteNumberOrName } from '../../../exercise/utility/music/notes/NoteNumberOrName';
import { toSteadyPart } from '../../../exercise/utility';
import * as _ from 'lodash';

@Directive({
  selector: '[appPlayOnClick]',
  standalone: true,
})
export class PlayOnClickDirective {
  private readonly _player = inject(PlayerService);

  @Input('appPlayOnClick')
  part: OneOrMany<OneOrMany<NoteNumberOrName> | NoteEvent> = [];

  @HostListener('click')
  onClick(): void {
    if (_.isEmpty(this.part)) {
      return;
    }
    this._player.playPart(toSteadyPart(this.part));
  }
}
