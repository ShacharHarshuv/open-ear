import { ChordsInRealSongsExercise } from './ChordsInRealSongsExercise';
import { testPureFunction } from '../../../shared/testing-utility/testPureFunction';
import {
  ProgressionInSongFromYouTubeDescriptor,
  chordsInRealSongsDescriptorList,
} from './chordsInRealSongsDescriptorList';
import {
  RomanNumeralChordSymbol,
  Mode,
  DeepReadonly,
} from '../../utility';
import * as _ from 'lodash';
import { testExercise } from '../testing-utility/test.exercise';

describe('ChordsInRealSongsExercise', () => {
  const context = testExercise({
    getExercise: () => new ChordsInRealSongsExercise(),
    settingDescriptorList: [
      'Included Chords',
    ],
  })

  describe('Songs', () => {
    chordsInRealSongsDescriptorList.forEach(chordProgressionDescriptor => {
      it(chordProgressionDescriptor.name ?? 'Anonymous Song', () => {
        const exercise = new ChordsInRealSongsExercise([chordProgressionDescriptor])
        exercise.updateSettings({
          includedChords: _.map(chordProgressionDescriptor.chords, 'chord'),
        })
        expect(exercise.getQuestion()).toBeTruthy();
      })
    });
  });

  describe('included progressions', () => {
    let exercise: ChordsInRealSongsExercise;

    function generateMockProgressionDescriptor(progression: RomanNumeralChordSymbol[]): ProgressionInSongFromYouTubeDescriptor {
      return {
        videoId: '',
        chords: progression.map((chord, index) => ({
          chord,
          seconds: index,
        })),
        endSeconds: progression.length,
        mode: Mode.Major,
        key: 'C',
      }
    }

    const progression_I_IV_V = generateMockProgressionDescriptor(['I', 'IV', 'V']);
    const progression_I_V_vi_IV = generateMockProgressionDescriptor(['I', 'V', 'vi', 'IV']);
    const progression_I_ii_V_I = generateMockProgressionDescriptor(['I', 'ii', 'V', 'I']);
    const progression_i_bVII_bVI = generateMockProgressionDescriptor(['i', 'bVII', 'bVI']);

    beforeEach(() => {
      exercise = new ChordsInRealSongsExercise([
        progression_I_IV_V,
        progression_I_V_vi_IV,
        progression_I_ii_V_I,
        progression_i_bVII_bVI
      ])
    });

    testPureFunction((selected: RomanNumeralChordSymbol[]): DeepReadonly<ProgressionInSongFromYouTubeDescriptor[]> => {
      exercise.updateSettings({
        ...exercise.getCurrentSettings(),
        includedChords: selected,
      })
      return exercise.getAvailableProgressions();
    }, [
      {
        args: [['I', 'IV', 'V']],
        returnValue: jasmine.arrayWithExactContents([progression_I_IV_V]),
      },
      {
        args: [['I', 'IV', 'V', 'vi']],
        returnValue: jasmine.arrayWithExactContents([progression_I_IV_V, progression_I_V_vi_IV]),
      },
      {
        args: [['I', 'ii', 'IV', 'V', 'vi']],
        returnValue: jasmine.arrayWithExactContents([progression_I_IV_V, progression_I_V_vi_IV, progression_I_ii_V_I]),
      },
      {
        args: [['i', 'bVII', 'bVI']],
        returnValue: jasmine.arrayWithExactContents([progression_i_bVII_bVI]),
      }
    ]);
  })
})
