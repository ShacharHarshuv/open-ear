import { Component } from '@angular/core';
import { InfoPanelComponent } from '../../../../shared/components/shared-components/info-panel/info-panel.component';

@Component({
  selector: 'app-notes-with-chords-explanation',
  templateUrl: './notes-with-chords-explanation.component.html',
  standalone: true,
  imports: [InfoPanelComponent],
})
export class NotesWithChordsExplanationComponent {}
