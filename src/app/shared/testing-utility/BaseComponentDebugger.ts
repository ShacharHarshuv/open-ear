import { ComponentFixture } from '@angular/core/testing';
import { Spectator } from '@ngneat/spectator';
import { DebugElement, inject } from '@angular/core';

export abstract class BaseComponentDebugger<GComponent> {
  constructor(readonly fixture: ComponentFixture<GComponent>) {}

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

  detectChanges(): void {
    this.spectator.detectChanges();
  }
}
