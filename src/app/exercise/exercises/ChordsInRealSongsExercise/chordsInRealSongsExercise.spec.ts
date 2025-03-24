import * as _ from 'lodash';
import { testPureFunction } from '../../../shared/testing-utility/testPureFunction';
import { DeepReadonly, Mode, RomanNumeralChordSymbol } from '../../utility';
import { testExercise } from '../testing-utility/test-exercise.spec';
import {
  ProgressionInSongFromYouTubeDescriptor,
  chordsInRealSongsDescriptorList,
} from './chordsInRealSongsDescriptorList';
import { chordsInRealSongsExercise } from './chordsInRealSongsExercise';

describe(chordsInRealSongsExercise.name, () => {
  const context = testExercise({
    getExercise: chordsInRealSongsExercise,
    settingDescriptorList: [
      'Analyze By',
      'Simplify Extensions',
      'Included Chords',
    ],
  });

  describe('Songs', () => {
    chordsInRealSongsDescriptorList.forEach((chordProgressionDescriptor) => {
      it(chordProgressionDescriptor.name ?? 'Anonymous Song', () => {
        const exercise = chordsInRealSongsExercise([
          chordProgressionDescriptor,
        ]);
        exercise.updateSettings?.({
          tonicForAnalyzing: 'original',
          includedChords: _.map(chordProgressionDescriptor.chords, 'chord'),
          acceptEquivalentChord: false,
        });
        expect(exercise.getQuestion()).toBeTruthy();
      });
    });
  });

  describe('included progressions', () => {
    let exercise: ReturnType<typeof chordsInRealSongsExercise>;

    function generateMockProgressionDescriptor(
      progression: RomanNumeralChordSymbol[],
    ): ProgressionInSongFromYouTubeDescriptor {
      return {
        videoId: '',
        chords: progression.map((chord, index) => ({
          chord,
          seconds: index,
        })),
        endSeconds: progression.length,
        mode: Mode.Major,
        key: 'C',
      };
    }

    const progression_I_IV_V = generateMockProgressionDescriptor([
      'I',
      'IV',
      'V',
    ]);
    const progression_I_V_vi_IV = generateMockProgressionDescriptor([
      'I',
      'V',
      'vi',
      'IV',
    ]);
    const progression_I_ii_V_I = generateMockProgressionDescriptor([
      'I',
      'ii',
      'V',
      'I',
    ]);
    const progression_i_bVII_bVI = generateMockProgressionDescriptor([
      'i',
      'bVII',
      'bVI',
    ]);

    beforeEach(() => {
      exercise = chordsInRealSongsExercise([
        progression_I_IV_V,
        progression_I_V_vi_IV,
        progression_I_ii_V_I,
        progression_i_bVII_bVI,
      ]);
    });

    testPureFunction(
      (
        selected: RomanNumeralChordSymbol[],
      ): DeepReadonly<ProgressionInSongFromYouTubeDescriptor[]> => {
        exercise.updateSettings?.({
          ...exercise.getCurrentSettings?.(),
          tonicForAnalyzing: 'major',
          includedChords: selected,
          acceptEquivalentChord: false,
        });
        return exercise.getAvailableProgressions(
          exercise.getCurrentSettings?.()!,
        );
      },
      [
        {
          args: [['I', 'IV', 'V']],
          returnValue: jasmine.arrayWithExactContents([progression_I_IV_V]),
        },
        {
          args: [['I', 'IV', 'V', 'vi']],
          returnValue: jasmine.arrayWithExactContents([
            progression_I_IV_V,
            progression_I_V_vi_IV,
          ]),
        },
        {
          args: [['I', 'ii', 'IV', 'V', 'vi']],
          returnValue: jasmine.arrayWithExactContents([
            progression_I_IV_V,
            progression_I_V_vi_IV,
            progression_I_ii_V_I,
          ]),
        },
        {
          args: [['i', 'bVII', 'bVI']],
          returnValue: jasmine.arrayWithExactContents([progression_i_bVII_bVI]),
        },
      ],
    );
  });
});
