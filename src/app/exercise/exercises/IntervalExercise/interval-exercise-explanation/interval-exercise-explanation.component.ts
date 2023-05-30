import { Component } from '@angular/core';
import {
  IntervalDescriptor,
  intervalDescriptorList,
} from '../intervalExercise';
import { NoteEvent } from '../../../../services/player.service';
import { OneOrMany, toNoteNumber } from '../../../utility';
import { NoteNumberOrName } from '../../../utility/music/notes/NoteNumberOrName';
import { InfoPanelComponent } from '../../../../shared/components/shared-components/info-panel/info-panel.component';
import { IonicModule } from '@ionic/angular';
import { PlayOnClickDirective } from '../../../../shared/components/shared-components/play-on-click.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interval-exercise-explanation',
  templateUrl: './interval-exercise-explanation.component.html',
  standalone: true,
  imports: [
    CommonModule,
    InfoPanelComponent,
    IonicModule,
    PlayOnClickDirective,
  ],
})
export class IntervalExerciseExplanationComponent {
  readonly intervalDescriptorList: (IntervalDescriptor & {
    toPlay: OneOrMany<OneOrMany<NoteNumberOrName> | NoteEvent>;
  })[] = intervalDescriptorList.map((interval) => ({
    ...interval,
    toPlay: ['C4', toNoteNumber('C4') + interval.semitones],
  }));
}
