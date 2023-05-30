import { Component, Input } from '@angular/core';
import {
  BaseControlValueAccessorComponent,
  getNgValueAccessorProvider,
} from '../../../../../../shared/ts-utility';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss'],
  providers: [getNgValueAccessorProvider(ListSelectComponent)],
})
export class ListSelectComponent extends BaseControlValueAccessorComponent<
  (string | number)[]
> {
  @Input()
  allAvailableOptions: {
    label: string;
    value: string | number;
  }[] = [];

  @Input()
  label: string = '';

  async onChange(answer: string | number, isSelected: boolean): Promise<void> {
    const currentValue: (string | number)[] = [
      ...(await firstValueFrom(this.value$)),
    ];
    let newValue: (string | number)[];
    if (currentValue.includes(answer) && !isSelected) {
      newValue = currentValue.filter((value) => value !== answer);
    } else if (!currentValue.includes(answer) && isSelected) {
      newValue = [...currentValue, answer];
    } else {
      return;
    }

    this.setViewValue(newValue);
  }
}
