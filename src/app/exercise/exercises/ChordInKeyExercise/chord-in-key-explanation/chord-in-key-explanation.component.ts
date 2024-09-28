import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CollapsibleComponent } from '../../../../shared/components/shared-components/collapsible/collapsible.component';
import { InfoPanelComponent } from '../../../../shared/components/shared-components/info-panel/info-panel.component';
import { PlayOnClickDirective } from '../../../../shared/components/shared-components/play-on-click.directive';
import { ChordsSharedExplanationComponent } from '../../chords-shared-explanation.component';
import { RomanNumeralSymbolComponent } from './roman-numeral-symbol.component';

@Component({
  selector: 'app-chord-in-key-explanation',
  templateUrl: './chord-in-key-explanation.component.html',
  standalone: true,
  imports: [
    InfoPanelComponent,
    CollapsibleComponent,
    IonicModule,
    PlayOnClickDirective,
    RomanNumeralSymbolComponent,
    ChordsSharedExplanationComponent,
  ],
})
export class ChordInKeyExplanationComponent {}
