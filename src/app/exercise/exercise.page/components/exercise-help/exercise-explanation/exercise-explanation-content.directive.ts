import { Directive, ElementRef, Input, ViewContainerRef, inject } from '@angular/core';
import Exercise from '../../../../exercise-logic';

@Directive({
  selector: '[appExerciseExplanationContent]',
  standalone: true,
})
export class ExerciseExplanationContentDirective {
  private _eRef = inject(ElementRef);
  private _viewContainerRef = inject(ViewContainerRef);

  @Input('appExerciseExplanationContent')
  set content(content: Exercise.ExerciseExplanationContent) {
    if (typeof content === 'string') {
      this._eRef.nativeElement.parentElement.innerHTML = content;
    } else {
      this._viewContainerRef.clear();
      // createComponent accepts a component type directly in modern Angular;
      // the old ComponentFactoryResolver.resolveComponentFactory() approach
      // doesn't work reliably with standalone components (which this app
      // uses throughout) and was silently failing, leaving this modal blank.
      this._viewContainerRef.createComponent(content);
    }
  }
}
