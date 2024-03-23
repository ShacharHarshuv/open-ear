import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NoteEvent } from '../../../../services/player.service';
import { InfoPanelComponent } from '../../../../shared/components/shared-components/info-panel/info-panel.component';
import { PlayOnClickDirective } from '../../../../shared/components/shared-components/play-on-click.directive';
import { OneOrMany, toNoteNumber } from '../../../utility';
import { NoteNumberOrName } from '../../../utility/music/notes/NoteNumberOrName';
import {
  IntervalDescriptor,
  intervalDescriptorList,
} from '../intervalExercise';

@Component({
  selector: 'app-interval-exercise-explanation',
  templateUrl: './interval-exercise-explanation.component.html',
  standalone: true,
  imports: [InfoPanelComponent, IonicModule, PlayOnClickDirective],
})
export class IntervalExerciseExplanationComponent {
  readonly intervalDescriptorList: (IntervalDescriptor & {
    toPlay: OneOrMany<OneOrMany<NoteNumberOrName> | NoteEvent>;
  })[] = intervalDescriptorList.map((interval) => ({
    ...interval,
    toPlay: ['C4', toNoteNumber('C4') + interval.semitones],
  }));
}
