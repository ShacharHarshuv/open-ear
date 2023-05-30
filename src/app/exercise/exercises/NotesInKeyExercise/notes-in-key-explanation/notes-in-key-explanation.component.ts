import { Component } from '@angular/core';
import { NoteEvent } from '../../../../services/player.service';
import { IV_V_I_CADENCE_IN_C } from '../../../utility/music/chords';
import { InfoPanelComponent } from '../../../../shared/components/shared-components/info-panel/info-panel.component';
import { CollapsibleComponent } from '../../../../shared/components/shared-components/collapsible/collapsible.component';
import { IonicModule } from '@ionic/angular';
import { PlayOnClickDirective } from '../../../../shared/components/shared-components/play-on-click.directive';

@Component({
  selector: 'app-notes-in-key-explanation',
  templateUrl: './notes-in-key-explanation.component.html',
  standalone: true,
  imports: [
    InfoPanelComponent,
    CollapsibleComponent,
    IonicModule,
    PlayOnClickDirective,
  ],
})
export class NotesInKeyExplanationComponent {
  resolutionOfReInC: NoteEvent[] = [
    ...IV_V_I_CADENCE_IN_C,
    {
      notes: 'D3',
      duration: '2n.',
    },
    {
      notes: 'C3',
      duration: '2n',
    },
  ];
}
