import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  ViewContainerRef,
  inject,
} from '@angular/core';
import Exercise from '../../../../exercise-logic';

@Directive({
  selector: '[appExerciseExplanationContent]',
  standalone: true,
})
export class ExerciseExplanationContentDirective {
  private _eRef = inject(ElementRef);
  private _viewContainerRef = inject(ViewContainerRef);
  private _cfResolver = inject(ComponentFactoryResolver);

  @Input('appExerciseExplanationContent')
  set content(content: Exercise.ExerciseExplanationContent) {
    if (typeof content === 'string') {
      this._eRef.nativeElement.parentElement.innerHTML = content;
    } else {
      this._viewContainerRef.clear();
      this._viewContainerRef.createComponent(
        this._cfResolver.resolveComponentFactory(content)
      );
    }
  }
}
