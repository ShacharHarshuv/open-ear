import { Spectator } from '@ngneat/spectator';
import { ExercisePage } from './exercise.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ExerciseSettingsDataMockService } from '../../services/exercise-settings-data.mock.service';
import { ExerciseMockService } from '../exercise.mock.service';
import { ModalModule } from '../../shared/modal/modal.module';
import { MockExercise } from '../MockExercise';
import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from '../../shared/components/shared-components/shared-components.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { timeoutAsPromise } from '../../shared/ts-utility';
import { PlayerMockService } from '../../services/player.mock.service';
import * as _ from 'lodash';
import { ExerciseModule } from '../exercise.module';

class ExercisePageDebugger {
  readonly spectator: Spectator<ExercisePage> = new Spectator<ExercisePage>(this.fixture, this.fixture.debugElement, this.fixture.componentInstance, this.fixture.nativeElement);

  constructor(public readonly fixture: ComponentFixture<ExercisePage>) {
  }

  getAnswersList(): string[] {
    return this.spectator.queryAll('.exercise__answer-button').map((element: HTMLElement) => element.innerText)
  }

  getExerciseTitle(): string | null {
    const toolbarElement: HTMLElement | null = this.spectator.query<HTMLElement>('ion-toolbar');
    return toolbarElement?.innerText ?? null;
  }

  displayExplanation(): void {
    const helpIcon = ExercisePageDebugger._getIconButton('help-outline');
    if (!helpIcon) {
      throw new Error(`Could not find help icon`);
    }
    helpIcon.click();
    this.fixture.detectChanges();
  }

  closeExplanation(): void {
    const closeIcon = ExercisePageDebugger._getIconButton('close-outline');
    if (!closeIcon) {
      throw new Error(`Cannot find close icon`);
    }
    closeIcon.click();
    this.fixture.detectChanges();
  }

  private static _getIconButton(iconName: string): HTMLElement | null {
    return document.querySelector<HTMLElement>(`ion-button ion-icon[name="${iconName}"]`);
  }
}

describe('ExercisePage', () => {
  const spies: jasmine.Spy[] = [];
  let exercisePageDebugger: ExercisePageDebugger;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExerciseModule,
        ModalModule,
        IonicModule.forRoot({
          animated: false,
        }),
        SharedComponentsModule,
        RouterTestingModule,
      ],
      providers: [
        ...ExerciseSettingsDataMockService.providers,
        ...ExerciseMockService.providers,
        ...PlayerMockService.providers,
        // todo: this is not the most declarative way to mock this
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {id: MockExercise.instance.id}
            }
          }
        }
      ]
    }).compileComponents();

    spies.push(
      spyOn(TestBed.inject(ExerciseService), 'getExercise').and.returnValue(MockExercise.instance),
      spyOn(MockExercise.instance, 'getAnswerList').and.returnValue([
        'Answer 1',
        'Answer 2',
        'Answer 3'
      ])
    );

    TestBed.inject(ExerciseSettingsDataMockService).exerciseIdToSettings[MockExercise.instance.id] = {
      exerciseSettings: {},
      globalSettings: {
        bpm: 120,
        moveToNextQuestionAutomatically: false,
        adaptive: false,
        playCadence: true,
      },
      wasExplanationDisplayed: true,
    }

    exercisePageDebugger = new ExercisePageDebugger(TestBed.createComponent(ExercisePage));

    exercisePageDebugger.spectator.detectChanges();
  });

  afterEach(() => {
    exercisePageDebugger.fixture.destroy();
    spies.forEach(spy => {
      spy.and.callThrough();
    });
  })

  it('all answers should be visible', async () => {
    expect(exercisePageDebugger.getAnswersList()).toEqual(['Answer 1', 'Answer 2', 'Answer 3']);
  });

  it('exercise name should be visible in the header', async () => {
    expect(exercisePageDebugger.getExerciseTitle()).toEqual(MockExercise.instance.name);
  });

  it('should display explanation', async () => {
    const expectedExplanation = MockExercise.instance.explanation;
    if (typeof expectedExplanation !== 'string') {
      throw Error(`Expected MockExercise name to be of type string. Received ${expectedExplanation}`);
    }
    expect(document.body.innerText).not.toContain(expectedExplanation);

    exercisePageDebugger.displayExplanation();

    await timeoutAsPromise(100);

    expect(document.body.innerText).toContain(expectedExplanation);

    exercisePageDebugger.closeExplanation();

    await timeoutAsPromise(100);

    expect(document.body.innerText).not.toContain(expectedExplanation);
  })
})
