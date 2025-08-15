import * as _ from 'lodash';
import { Exercise, filterIncludedAnswers } from '../../exercise-logic';
import { Mode, RomanNumeralChordSymbol, randomFromList } from '../../utility';
import { toMusicalTextDisplay } from '../../utility/music/getMusicTextDisplay';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import {
  RomanAnalysisChordProgressionExerciseSettings,
  useRomanAnalysisChordProgressionExercise,
} from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/romanAnalysisChordProgressionExercise';
import {
  ModalAnalysisSettings,
  modalAnalysis,
} from '../utility/settings/modal-analysis';
import { CommonChordProgressionsExplanationComponent } from './common-chord-progressions-explanation/common-chord-progressions-explanation.component';
import {
  ProgressionDescriptor,
  commonProgressionDescriptorList,
} from './commonProgressions';

type CommonChordProgressionExerciseSettings =
  RomanAnalysisChordProgressionExerciseSettings &
    ModalAnalysisSettings & {
      includedProgressions: string[];
    };

function getProgressionId(progression: ProgressionDescriptor): string {
  return progression.romanNumerals.join(' ');
}

const defaultProgressions: string[] = [
  'I V I',
  'I IV I',
  'I IV V I',
  'I IV V IV',
  'I V IV V',
  'I V IV I',
  'I V vi IV',
  'I vi IV V',
  'vi IV I V',
  'I IV vi V',
  'IV I V vi',
  'IV V I vi',
];

function getIncludedProgressionsDescriptors(
  settings: CommonChordProgressionExerciseSettings,
): ProgressionDescriptor[] {
  return commonProgressionDescriptorList
    .filter((progression) => {
      return settings.includedProgressions.includes(
        getProgressionId(progression),
      );
    })
    .map((progression) => {
      if (
        settings.modalAnalysis !== 'tonic-1' &&
        progression.mode &&
        progression.mode !== Mode.Major
      ) {
        return {
          ...progression,
          mode: Mode.Major,
          romanNumerals: progression.romanNumerals.map((romanNumeral) =>
            RomanNumeralChord.toRelativeMode(
              romanNumeral,
              progression.mode!,
              Mode.Major,
            ),
          ),
        };
      }
      return progression;
    });
}

const romanAnalysis = useRomanAnalysisChordProgressionExercise();

export const commonChordProgressionExercise: Exercise<
  RomanNumeralChordSymbol,
  CommonChordProgressionExerciseSettings
> = {
  id: 'commonChordProgression',
  name: 'Common Progressions',
  summary:
    'Practice on recognizing the most common chord progression in popular music.',
  explanation: CommonChordProgressionsExplanationComponent,
  logic: (settings) => ({
    getQuestion() {
      const includedProgressions: ProgressionDescriptor[] =
        getIncludedProgressionsDescriptors(settings);
      const selectedChordProgression = randomFromList(includedProgressions);
      settings.cadenceType = {
        [Mode.Dorian]: 'i iv V i',
        [Mode.Minor]: 'i iv V i',
        [Mode.Major]: 'I IV V I',
        [Mode.Mixolydian]: 'I IV V I',
      }[selectedChordProgression.mode ?? Mode.Major];

      return romanAnalysis.getQuestion(
        settings,
        selectedChordProgression.romanNumerals,
      );
    },
    answerList: filterIncludedAnswers(
      romanAnalysis.fullAnswerList,
      _.uniq(
        _.flatMap(
          getIncludedProgressionsDescriptors(settings),
          'romanNumerals',
        ),
      ),
    ),
  }),
  settingsConfig: {
    controls: [
      ...romanAnalysis.settingsConfig.controls,
      ...modalAnalysis.controls,
      {
        key: 'includedProgressions',
        descriptor: {
          controlType: 'list-select',
          label: 'Included Progressions',
          allOptions: commonProgressionDescriptorList.map((progression) => ({
            value: getProgressionId(progression),
            label:
              toMusicalTextDisplay(getProgressionId(progression)) +
              (progression.name ? ` (${progression.name})` : ''),
          })),
        },
      },
    ],
    defaults: {
      ...modalAnalysis.defaults,
      ...romanAnalysis.settingsConfig.defaults,
      includedProgressions: defaultProgressions,
    },
  },
};
