import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExerciseSettingsDataMockService } from '../../services/exercise-settings-data.mock.service';
import { NoteEvent, PlayerService } from '../../services/player.service';
import { ModalFrameComponent } from '../../shared/modal/modal-frame/modal-frame.component';
import { TestingUtility } from '../../shared/testing-utility';
import { timeoutAsPromise } from '../../shared/ts-utility';
import { ExerciseTestingModule } from '../exercise-testing.module';
import { ExerciseService } from '../exercise.service';
import { MockExercise } from '../MockExercise';
import { ExercisePage } from './exercise.page';
import { ExercisePageDebugger } from './exerice.page.debugger.spec';

describe(ExercisePage.name, () => {
  const spies: jasmine.Spy[] = [];
  let exercisePageDebugger: ExercisePageDebugger;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExerciseTestingModule,
        ModalFrameComponent,
        // IonicModule.forRoot({
        //   animated: false,
        // }),
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: MockExercise.instance.id },
            },
          },
        },
      ],
    }).compileComponents();

    spies.push(
      spyOn(TestBed.inject(ExerciseService), 'getExercise').and.returnValue(
        MockExercise.instance,
      ),
      spyOn(MockExercise.instance, 'getAnswerList').and.returnValue([
        {
          answer: 'Answer 1',
          playOnClick: 'F4',
        },
        'Answer 2',
        'Answer 3',
      ]),
    );

    TestBed.inject(ExerciseSettingsDataMockService).exerciseIdToSettings[
      MockExercise.instance.id
    ] = {
      exerciseSettings: {},
      globalSettings: {
        bpm: 120,
        moveToNextQuestionAutomatically: false,
        revealAnswerAfterFirstMistake: false,
        answerQuestionAutomatically: false,
        adaptive: false,
        playCadence: true,
        instrument: 'piano',
        playWrongAnswer: false,
      },
      wasExplanationDisplayed: true,
    };
  });

  afterEach(() => {
    exercisePageDebugger.fixture.destroy();
    spies.forEach((spy) => {
      spy.and.callThrough();
    });
  });

  //#region Utility functions
  function createComponent(): void {
    exercisePageDebugger = new ExercisePageDebugger(
      TestBed.createComponent(ExercisePage),
    );
    exercisePageDebugger.spectator.detectChanges();
  }

  function createPlayMultiplePartsSpy(): jasmine.Spy<
    PlayerService['playMultipleParts']
  > {
    return spyOn(TestBed.inject(PlayerService), 'playMultipleParts');
  }

  function answerAllSegmentsOfMockQuestion(): void {
    exercisePageDebugger.clickOnAnswer('Answer 1');
    exercisePageDebugger.clickOnAnswer('Answer 2');
    expect(
      TestingUtility.isDisabled(exercisePageDebugger.getNextButton()),
    ).toBeFalse();
  }

  //#endregion

  it('all answers should be visible', async () => {
    createComponent();
    expect(exercisePageDebugger.getPossibleAnswersList()).toEqual([
      {
        answerText: 'Answer 1',
        wasWrong: false,
      },
      {
        answerText: 'Answer 2',
        wasWrong: false,
      },
      {
        answerText: 'Answer 3',
        wasWrong: false,
      },
    ]);
  });

  it('exercise name should be visible in the header', async () => {
    createComponent();
    expect(exercisePageDebugger.getExerciseTitle()).toEqual(
      MockExercise.instance.name,
    );
  });

  // todo(#75): there is an issue with importing the ionic module, without which it can't work
  xit('should display explanation', async () => {
    const expectedExplanation = MockExercise.instance.explanation;
    if (typeof expectedExplanation !== 'string') {
      throw Error(
        `Expected MockExercise name to be of type string. Received ${expectedExplanation}`,
      );
    }
    expect(document.body.innerText).not.toContain(expectedExplanation);

    exercisePageDebugger.displayExplanation();

    await timeoutAsPromise(100);

    expect(document.body.innerText).toContain(expectedExplanation);

    exercisePageDebugger.closeExplanation();

    await timeoutAsPromise(100);

    expect(document.body.innerText).not.toContain(expectedExplanation);
  });

  describe('Playing Questions', function () {
    it('exercise question should be played with cadence when exercise load', fakeAsync(() => {
      const playMultiplePartsSpy: jasmine.Spy<
        PlayerService['playMultipleParts']
      > = createPlayMultiplePartsSpy();
      createComponent();
      flush();
      expect(playMultiplePartsSpy).toHaveBeenCalledOnceWith(
        jasmine.arrayWithExactContents([
          ...MockExercise.cadenceToPlayExpectation,
          ...MockExercise.questionToPlayExpectation,
        ]),
      );
      playMultiplePartsSpy.and.callThrough();
    }));

    it('clicking repeat should repeat the question with cadence', fakeAsync(() => {
      createComponent();
      flush();
      const playMultiplePartsSpy: jasmine.Spy = createPlayMultiplePartsSpy();
      expect(playMultiplePartsSpy).not.toHaveBeenCalled();
      exercisePageDebugger.clickOnRepeat();
      flush();
      expect(playMultiplePartsSpy).toHaveBeenCalledOnceWith(
        jasmine.arrayWithExactContents([
          ...MockExercise.cadenceToPlayExpectation,
          ...MockExercise.questionToPlayExpectation,
        ]),
      );
    }));

    it('exercise question should be played without cadence when clicking musical note icon', fakeAsync(() => {
      createComponent();
      flush();
      exercisePageDebugger.detectChanges();

      const playMultiplePartsSpy: jasmine.Spy = createPlayMultiplePartsSpy();
      expect(playMultiplePartsSpy).not.toHaveBeenCalled();
      exercisePageDebugger.clickOnMusicalNote();
      flush();
      expect(playMultiplePartsSpy).toHaveBeenCalledOnceWith(
        jasmine.arrayWithExactContents([
          ...MockExercise.questionToPlayExpectation,
        ]),
      );
    }));

    // TODO(#76) Test with different "play cadence" modes

    // TODO(#76) Test BPM change. (Cadence bpm should remain regardless of settings)
  });

  describe('Answer initialization', function () {
    beforeEach(fakeAsync(() => {
      createComponent();
      flush();
      exercisePageDebugger.detectChanges();
    }));

    describe('Answering', () => {
      it('should initially have two unanswered segments', fakeAsync(() => {
        expect(exercisePageDebugger.getCurrentAnswersList()).toEqual([
          {
            answer: null,
            wasWrong: false,
          },
          {
            answer: null,
            wasWrong: false,
          },
        ]);
      }));

      it('should display answer as wrong', fakeAsync(() => {
        // answering a wrong answer
        exercisePageDebugger.clickOnAnswer('Answer 2');

        // current answers should indicate answer was wrong
        expect(exercisePageDebugger.getCurrentAnswersList()).toEqual([
          {
            answer: null,
            wasWrong: true,
          },
          {
            answer: null,
            wasWrong: false,
          },
        ]);

        // the wrong answer button should be marked wrong
        expect(exercisePageDebugger.getPossibleAnswersList()).toEqual([
          {
            answerText: 'Answer 1',
            wasWrong: false,
          },
          {
            answerText: 'Answer 2',
            wasWrong: true,
          },
          {
            answerText: 'Answer 3',
            wasWrong: false,
          },
        ]);

        // answer the right answer
        exercisePageDebugger.clickOnAnswer('Answer 1');

        // current answer should indicate first answer was wrong
        expect(exercisePageDebugger.getCurrentAnswersList()).toEqual([
          {
            answer: 'Answer 1',
            wasWrong: true,
          },
          {
            answer: null,
            wasWrong: false,
          },
        ]);

        // Answer buttons should NOT be marked as wrong
        expect(exercisePageDebugger.getPossibleAnswersList()).toEqual([
          {
            answerText: 'Answer 1',
            wasWrong: false,
          },
          {
            answerText: 'Answer 2',
            wasWrong: false,
          },
          {
            answerText: 'Answer 3',
            wasWrong: false,
          },
        ]);
      }));
    });

    describe('Next question', function () {
      it('should be disabled before answering', () => {
        expect(
          TestingUtility.isDisabled(exercisePageDebugger.getNextButton()),
        ).toBeTrue();
      });

      it('should be disabled when partially answered', fakeAsync(() => {
        exercisePageDebugger.clickOnAnswer('Answer 1');
        expect(
          TestingUtility.isDisabled(exercisePageDebugger.getNextButton()),
        ).toBeTrue();
      }));

      it('should be enabled when completely answered', fakeAsync(() => {
        exercisePageDebugger.clickOnAnswer('Answer 1');
        exercisePageDebugger.clickOnAnswer('Answer 2');
        expect(
          TestingUtility.isDisabled(exercisePageDebugger.getNextButton()),
        ).toBeFalse();
      }));

      it('when clicking next, next question should be played and answers indication cleared', fakeAsync(() => {
        answerAllSegmentsOfMockQuestion();

        // verify answers are indeed filled
        expect(exercisePageDebugger.getCurrentAnswersList()).toEqual([
          {
            answer: 'Answer 1',
            wasWrong: false,
          },
          {
            answer: 'Answer 2',
            wasWrong: false,
          },
        ]);

        // making sure spy call list is empty before clicking
        const playMultiplePartsSpy: jasmine.Spy<
          PlayerService['playMultipleParts']
        > = createPlayMultiplePartsSpy();
        flush();
        exercisePageDebugger.detectChanges();
        expect(playMultiplePartsSpy).not.toHaveBeenCalled();

        exercisePageDebugger.clickOnNext();
        expect(playMultiplePartsSpy).toHaveBeenCalledOnceWith(
          jasmine.arrayWithExactContents([
            ...MockExercise.cadenceToPlayExpectation,
            ...MockExercise.questionToPlayExpectation,
          ]),
        );

        playMultiplePartsSpy.and.callThrough();

        expect(exercisePageDebugger.getCurrentAnswersList()).toEqual([
          {
            answer: null,
            wasWrong: false,
          },
          {
            answer: null,
            wasWrong: false,
          },
        ]);
      }));

      // TODO(#76) Test "move to next question automatically"
    });

    describe('play on answer click', () => {
      it('Nothing should played before completing all answers', fakeAsync(() => {
        const playerSpy = createPlayMultiplePartsSpy();
        exercisePageDebugger.clickOnAnswer('Answer 1');
        expect(playerSpy).not.toHaveBeenCalled();
      }));

      it('after all segments when answers, it should play answers on click', fakeAsync(() => {
        answerAllSegmentsOfMockQuestion();
        const playPartSpy = spyOn<PlayerService, 'playPart'>(
          TestBed.inject(PlayerService),
          'playPart',
        );
        exercisePageDebugger.clickOnAnswer('Answer 1');
        expect(playPartSpy).toHaveBeenCalledOnceWith(
          jasmine.arrayWithExactContents([
            jasmine.objectContaining<NoteEvent>({
              notes: ['F4'],
              duration: '4n',
            }),
          ]),
          jasmine.anything(),
        );

        // verify answers indication remain
        expect(exercisePageDebugger.getCurrentAnswersList()).toEqual([
          {
            answer: 'Answer 1',
            wasWrong: false,
          },
          {
            answer: 'Answer 2',
            wasWrong: false,
          },
        ]);

        playPartSpy.and.callThrough();
      }));
    });

    describe('Stats', () => {
      it('should calculate the stats correctly', fakeAsync(() => {
        expect(exercisePageDebugger.getStats()).toEqual({
          correctAnswers: 0,
          totalAnswers: 0,
          percentage: 0,
        });

        exercisePageDebugger.clickOnAnswer('Answer 1');
        expect(exercisePageDebugger.getStats()).toEqual({
          correctAnswers: 1,
          totalAnswers: 1,
          percentage: 100,
        });

        exercisePageDebugger.clickOnAnswer('Answer 3');
        expect(exercisePageDebugger.getStats()).toEqual({
          correctAnswers: 1,
          totalAnswers: 1,
          percentage: 100,
        });

        exercisePageDebugger.clickOnAnswer('Answer 2');
        expect(exercisePageDebugger.getStats()).toEqual({
          correctAnswers: 1,
          totalAnswers: 2,
          percentage: 50,
        });

        exercisePageDebugger.clickOnNext();
        exercisePageDebugger.clickOnAnswer('Answer 1');
        expect(exercisePageDebugger.getStats()).toEqual({
          correctAnswers: 2,
          totalAnswers: 3,
          percentage: 66.67,
        });
      }));
    });
  });

  // TODO(#76) test adaptive mode. No need to get into logic, as it's already tests in AdaptiveExercise. Just mock AdaptiveExercise and make sure it's invoked
});
