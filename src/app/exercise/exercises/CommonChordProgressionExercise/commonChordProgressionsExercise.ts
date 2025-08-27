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
  getCadenceInCFromModalAnalysis,
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
      if (settings.modalAnalysis !== progression.analysis ?? 'tonic-1') {
        return {
          ...progression,
          analysis: settings.modalAnalysis, // todo: we also need to change the cadence to reflect this probably
          romanNumerals: progression.romanNumerals.map((romanNumeral) =>
            RomanNumeralChord.convertAnalysis({
              chordSymbol: romanNumeral,
              mode: progression.mode ?? Mode.Ionian,
              currentModalAnalysis: progression.analysis ?? 'tonic-1',
              desiredModalAnalysis: settings.modalAnalysis,
            }),
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
      const includedProgressions = getIncludedProgressionsDescriptors(settings);
      const selectedChordProgression = randomFromList(includedProgressions);

      const cadenceInC = getCadenceInCFromModalAnalysis(
        selectedChordProgression.mode ?? Mode.Ionian,
        settings.modalAnalysis,
      );

      return romanAnalysis.getQuestion(
        settings,
        selectedChordProgression.romanNumerals,
        cadenceInC,
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
        descriptor: (settings) => ({
          controlType: 'list-select',
          label: 'Included Progressions',
          allOptions: commonProgressionDescriptorList.map((progression) => {
            // todo: this is probably code duplication
            const chordsInCorrectAnalysis = progression.romanNumerals.map(
              (romanNumeral) =>
                RomanNumeralChord.convertAnalysis({
                  chordSymbol: romanNumeral,
                  mode: progression.mode ?? Mode.Ionian,
                  currentModalAnalysis: progression.analysis ?? 'tonic-1',
                  desiredModalAnalysis: settings.modalAnalysis,
                }),
            );

            return {
              value: getProgressionId(progression),
              label:
                toMusicalTextDisplay(chordsInCorrectAnalysis.join(' ')) +
                (progression.name ? ` (${progression.name})` : ''),
            };
          }),
        }),
      },
    ],
    defaults: {
      ...modalAnalysis.defaults,
      ...romanAnalysis.settingsConfig.defaults,
      includedProgressions: defaultProgressions,
    },
  },
};
