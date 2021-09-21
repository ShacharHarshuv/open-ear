import {
  Component,
  Input,
  forwardRef
} from '@angular/core';
import { BaseControlValueAccessorComponent } from '../../../../../../shared/ts-utility';
import { take } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-included-answers',
  templateUrl: './included-answers.component.html',
  styleUrls: ['./included-answers.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IncludedAnswersComponent),
      multi: true,
    },
  ],
})
export class IncludedAnswersComponent extends BaseControlValueAccessorComponent<string[]> {
  @Input()
  allAvailableAnswers: string[];

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
