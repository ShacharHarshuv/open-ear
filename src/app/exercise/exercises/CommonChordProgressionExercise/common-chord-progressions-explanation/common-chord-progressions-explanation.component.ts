import { Component } from '@angular/core';
import { InfoPanelComponent } from '../../../../shared/components/shared-components/info-panel/info-panel.component';

@Component({
  selector: 'app-common-chord-progressions-explanation',
  templateUrl: './common-chord-progressions-explanation.component.html',
  standalone: true,
  imports: [InfoPanelComponent],
})
export class CommonChordProgressionsExplanationComponent {}
