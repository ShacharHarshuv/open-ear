import * as _ from 'lodash';
import { exerciseSmokeTest } from '../testing-utility/test-exercise.spec';
import { chordsInRealSongsExercise } from './chordsInRealSongsExercise';
import { songChordQuestions } from './songQuestions';

describe(chordsInRealSongsExercise.name, () => {
  exerciseSmokeTest(chordsInRealSongsExercise);

  describe('Songs', () => {
    songChordQuestions.forEach((chordProgressionDescriptor) => {
      it(chordProgressionDescriptor.name ?? 'Anonymous Song', () => {
        expect(
          chordsInRealSongsExercise
            .logic({
              modalAnalysis: chordProgressionDescriptor.analysis ?? 'tonic-1',
              includedChords: _.map(chordProgressionDescriptor.chords, 'chord'),
              acceptEquivalentChord: false,
              learnProgressions: false,
            })
            .getQuestion(),
        ).toBeTruthy();
      });
    });
  });

  // describe('included progressions', () => {
  //   let exercise: ReturnType<typeof chordsInRealSongsExercise>;

  //   function generateMockProgressionDescriptor(
  //     progression: RomanNumeralChordSymbol[],
  //   ): YouTubeSongQuestion {
  //     return {
  //       videoId: '',
  //       chords: progression.map((chord, index) => ({
  //         chord,
  //         seconds: index,
  //       })),
  //       endSeconds: progression.length,
  //       mode: Mode.Ionian,
  //       key: 'C',
  //     };
  //   }

  //   const progression_I_IV_V = generateMockProgressionDescriptor([
  //     'I',
  //     'IV',
  //     'V',
  //   ]);
  //   const progression_I_V_vi_IV = generateMockProgressionDescriptor([
  //     'I',
  //     'V',
  //     'vi',
  //     'IV',
  //   ]);
  //   const progression_I_ii_V_I = generateMockProgressionDescriptor([
  //     'I',
  //     'ii',
  //     'V',
  //     'I',
  //   ]);
  //   const progression_i_bVII_bVI = generateMockProgressionDescriptor([
  //     'i',
  //     'bVII',
  //     'bVI',
  //   ]);

  //   beforeEach(() => {
  //     exercise = chordsInRealSongsExercise();
  //   });

  //   testPureFunction(
  //     (
  //       selected: RomanNumeralChordSymbol[],
  //     ): DeepReadonly<YouTubeSongQuestion[]> => {
  //       exercise.updateSettings?.({
  //         ...exercise.getCurrentSettings?.(),
  //         tonicForAnalyzing: 'major',
  //         includedChords: selected,
  //         acceptEquivalentChord: false,
  //         learnProgressions: false,
  //       });
  //       return exercise.getAvailableProgressions(
  //         exercise.getCurrentSettings?.()!,
  //       );
  //     },
  //     [
  //       {
  //         args: [['I', 'IV', 'V']],
  //         returnValue: jasmine.arrayWithExactContents([progression_I_IV_V]),
  //       },
  //       {
  //         args: [['I', 'IV', 'V', 'vi']],
  //         returnValue: jasmine.arrayWithExactContents([
  //           progression_I_IV_V,
  //           progression_I_V_vi_IV,
  //         ]),
  //       },
  //       {
  //         args: [['I', 'ii', 'IV', 'V', 'vi']],
  //         returnValue: jasmine.arrayWithExactContents([
  //           progression_I_IV_V,
  //           progression_I_V_vi_IV,
  //           progression_I_ii_V_I,
  //         ]),
  //       },
  //       {
  //         args: [['i', 'bVII', 'bVI']],
  //         returnValue: jasmine.arrayWithExactContents([progression_i_bVII_bVI]),
  //       },
  //     ],
  //   );
  // });
});
