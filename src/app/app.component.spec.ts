import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  TestBed,
  waitForAsync,
} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { IonicTestingModule } from './shared/ionic-testing/ionic-testing.module';
import { ReleaseNotesTestingModule } from './release-notes/release-notes.testing.module';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicTestingModule,
        ReleaseNotesTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
