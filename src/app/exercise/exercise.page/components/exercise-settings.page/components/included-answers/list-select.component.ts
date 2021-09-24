import {
  Component,
  Input,
  forwardRef
} from '@angular/core';
import { BaseControlValueAccessorComponent } from '../../../../../../shared/ts-utility';
import { take } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListSelectComponent),
      multi: true,
    },
  ],
})
export class ListSelectComponent extends BaseControlValueAccessorComponent<(string | number)[]> {
  @Input()
  allAvailableOptions: {
    label: string,
    value: string | number,
  }[];

  @Input()
  label: string;

  async onChange(answer: string | number, isSelected: boolean): Promise<void> {
    const currentValue: (string | number)[] = [...(await this.value$.pipe(take(1)).toPromise())];
    let newValue: (string | number)[];
    if (currentValue.includes(answer) && !isSelected) {
      newValue = currentValue.filter(value => value !== answer);
    } else if (!currentValue.includes(answer) && isSelected) {
      newValue = [
        ...currentValue,
        answer,
      ]
    } else {
      return;
    }

    this.setViewValue(newValue);
  }
}
