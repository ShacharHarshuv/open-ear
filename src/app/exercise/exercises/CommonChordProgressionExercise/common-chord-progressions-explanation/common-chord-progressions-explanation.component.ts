import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfoPanelComponent } from '../../../../shared/components/shared-components/info-panel/info-panel.component';

@Component({
  selector: 'app-common-chord-progressions-explanation',
  templateUrl: './common-chord-progressions-explanation.component.html',
  standalone: true,
  imports: [InfoPanelComponent, RouterLink],
})
export class CommonChordProgressionsExplanationComponent {
  readonly modalController = inject(ModalController);
}
