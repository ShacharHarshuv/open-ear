import { Component, computed, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RomanNumeralChordSymbol } from '../../../utility';
import { signalFromProperty } from '../../../../shared/ng-utilities/signalFromProperty';
import { RomanNumeralChord } from '../../../utility/music/harmony/RomanNumeralChord';

@Component({
  selector: 'app-roman-numeral-symbol',
  standalone: true,
  imports: [CommonModule],
  template: `{{ symbolString() }}`,
})
export class RomanNumeralSymbolComponent {
  @Input({ required: true, alias: 'symbol' })
  symbolInput: RomanNumeralChordSymbol = 'I'; // dummy initial value, will not be visible

  readonly symbol = signalFromProperty(this, 'symbolInput');

  readonly symbolString = computed(() => {
    return new RomanNumeralChord(this.symbol()).toViewString();
  });

  @HostBinding('innerHtml')
  get innerHtml(): string {
    return this.symbolString();
  }
}
