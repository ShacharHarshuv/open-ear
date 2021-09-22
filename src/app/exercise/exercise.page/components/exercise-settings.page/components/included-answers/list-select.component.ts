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
export class ListSelectComponent extends BaseControlValueAccessorComponent<string[]> {
  @Input()
  allAvailableOptions: string[];

  @Input()
  label: string;

  async onChange(answer: string, isSelected: boolean): Promise<void> {
    const currentValue: string[] = [...(await this.value$.pipe(take(1)).toPromise())];
    let newValue: string[];
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
