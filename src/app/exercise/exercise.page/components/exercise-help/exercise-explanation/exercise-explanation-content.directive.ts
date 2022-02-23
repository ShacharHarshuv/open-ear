import {ComponentFactoryResolver, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Exercise} from "../../../../Exercise";

@Directive({
  selector: '[exerciseExplanationContent]'
})
export class ExerciseExplanationContentDirective {

  @Input('exerciseExplanationContent')
  set content(content: Exercise.ExerciseExplanationContent) {
    if (typeof content === 'string') {
      this._eRef.nativeElement.parentElement.innerHTML = content;
    } else {
      this._viewContainerRef.clear();
      this._viewContainerRef.createComponent(
        this._cfResolver.resolveComponentFactory(content),
      );
    }
  }

  constructor(
    private _eRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _cfResolver: ComponentFactoryResolver,
  ) {
  }
}
