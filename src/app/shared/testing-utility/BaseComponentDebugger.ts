import { ComponentFixture } from "@angular/core/testing";
import { Spectator } from "@ngneat/spectator";
import { DebugElement } from "@angular/core";

export abstract class BaseComponentDebugger<GComponent> {
  readonly spectator: Spectator<GComponent> = new Spectator<GComponent>(
    this.fixture,
    this.debugElement,
    this.componentInstance,
    this.nativeElement
  );

  get componentInstance(): GComponent {
    return this.fixture.componentInstance;
  }

  get nativeElement(): HTMLElement {
    return this.fixture.nativeElement;
  }

  get debugElement(): DebugElement {
    return this.fixture.debugElement;
  }

  constructor(public readonly fixture: ComponentFixture<GComponent>) {}

  detectChanges(): void {
    this.spectator.detectChanges();
  }
}
