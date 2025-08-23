// import { TestBed, fakeAsync, flush } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ExerciseTestingModule } from '../../exercise-testing.module';
// import { ExerciseMockService } from '../../exercise.mock.service';
// import { NoteType } from '../../utility/music/notes/NoteType';
// import { noteTypeToNote } from '../../utility/music/notes/noteTypeToNote';
// import { ExerciseStateService } from './exercise-state.service';

// describe('ExerciseStateService', function () {
//   let exerciseStateService: ExerciseStateService;

//   beforeEach(fakeAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule, ExerciseTestingModule],
//       providers: [ExerciseStateService],
//     }).compileComponents();

//     exerciseStateService = TestBed.inject(ExerciseStateService);
//     exerciseStateService.init();
//     flush();
//   }));

//   describe('reset statistics', () => {
//     it('should reset total questions', () => {
//       expect(exerciseStateService.answer('Answer 1')).toBeTrue();
//       expect(exerciseStateService.answer('Answer 2')).toBeTrue();
//       expect(exerciseStateService.totalCorrectAnswers()).toEqual(2);
//       expect(exerciseStateService.totalQuestions()).toEqual(2);

//       exerciseStateService.resetStatistics();
//       expect(exerciseStateService.totalCorrectAnswers()).toEqual(0);
//       expect(exerciseStateService.totalQuestions()).toEqual(0);
//     });

//     // it('should reset adaptive exercise memory', () => {
//     //   const adaptiveExerciseResetSpy = spyOn(
//     //     AdaptiveExerciseMockService.adaptiveExerciseMock,
//     //     'reset',
//     //   );
//     //   expect(adaptiveExerciseResetSpy).not.toHaveBeenCalled();
//     //   exerciseStateService.resetStatistics();
//     //   expect(adaptiveExerciseResetSpy).toHaveBeenCalledOnceWith();
//     // });

//     it('should move to next question', () => {
//       const moveToNextQuestionSpy = spyOn(exerciseStateService, 'nextQuestion');
//       exerciseStateService.resetStatistics();
//       expect(moveToNextQuestionSpy).toHaveBeenCalledOnceWith();
//     });
//   });

//   describe('answerToLabelStringMap', function () {
//     // Ideally we'll check this works on initialization but this is easier to set up
//     it('should be updated after updating settings', () => {
//       spyOn(exerciseStateService.exercise, 'getAnswerList').and.returnValue({
//         rows: [
//           [
//             {
//               answer: 'Answer 1',
//               displayLabel: 'Answer 1 :)',
//             },
//             {
//               answer: 'Answer 2',
//               displayLabel: 'Answer 2 :)',
//             },
//           ],
//         ],
//       });

//       exerciseStateService.updateSettings({
//         globalSettings: exerciseStateService.globalSettings(),
//         exerciseSettings: exerciseStateService.exerciseSettings,
//       });
//       expect(exerciseStateService.answerToLabelStringMap).toEqual({
//         'Answer 1': 'Answer 1 :)',
//         'Answer 2': 'Answer 2 :)',
//       });
//     });
//   });

//   describe('answer', function () {
//     beforeEach(() => {
//       spyOn(ExerciseMockService.mockExercise, 'getQuestion').and.returnValue({
//         type: 'notes',
//         segments: ['C', 'D', 'E'].map((note: NoteType) => ({
//           rightAnswer: note,
//           partToPlay: noteTypeToNote(note, 4),
//         })),
//       });
//       exerciseStateService.nextQuestion();
//       expect(exerciseStateService.currentAnswers()).toEqual([
//         jasmine.objectContaining({
//           answer: null,
//           wasWrong: false,
//         }),
//         jasmine.objectContaining({
//           answer: null,
//           wasWrong: false,
//         }),
//         jasmine.objectContaining({
//           answer: null,
//           wasWrong: false,
//         }),
//       ]);
//     });

//     describe('without specifying index', function () {
//       it('should work', () => {
//         expect(exerciseStateService.answer('C')).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('C')).toBeFalse();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: true,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('D')).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'D',
//             wasWrong: true,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('E')).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'D',
//             wasWrong: true,
//           }),
//           jasmine.objectContaining({
//             answer: 'E',
//             wasWrong: false,
//           }),
//         ]);
//       });
//     });

//     describe('specifying index', () => {
//       it('should answer in different order', () => {
//         expect(exerciseStateService.answer('E', 2)).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'E',
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('D', 0)).toBeFalse();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: true,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'E',
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('C', 0)).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: true,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'E',
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('D', 0)).toBeFalse(); // should not do anything if answer again for the same segmen).toBeTruet
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: true,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'E',
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('D', 1)).toBeTrue(); // should not do anything if answer again for the same segmen).toBeTruet
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: true,
//           }),
//           jasmine.objectContaining({
//             answer: 'D',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'E',
//             wasWrong: false,
//           }),
//         ]);
//       });

//       it('should ignore new answers if already answered', () => {
//         expect(exerciseStateService.answer('D', 1)).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'D',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('E', 1)).toBeFalse();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'D',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//         ]);
//       });
//     });

//     describe('combining specifying index an implicit index', function () {
//       it('should answer the first unanswered even if later answer was answered', () => {
//         expect(exerciseStateService.answer('E', 2)).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'E',
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('C')).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'E',
//             wasWrong: false,
//           }),
//         ]);
//       });

//       it('should answer the first unanswered question even if earlier question was answered with index', () => {
//         expect(exerciseStateService.answer('D', 1)).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'D',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('C', 0)).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'D',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: null,
//             wasWrong: false,
//           }),
//         ]);
//         expect(exerciseStateService.answer('E')).toBeTrue();
//         expect(exerciseStateService.currentAnswers()).toEqual([
//           jasmine.objectContaining({
//             answer: 'C',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'D',
//             wasWrong: false,
//           }),
//           jasmine.objectContaining({
//             answer: 'E',
//             wasWrong: false,
//           }),
//         ]);
//       });
//     });
//   });
// });
