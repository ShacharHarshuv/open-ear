import * as _ from 'lodash';
import { randomFromList } from '../../../shared/ts-utility';
import Exercise from '../../exercise-logic';
import { Mode, RomanNumeralChordSymbol } from '../../utility';
import { toMusicalTextDisplay } from '../../utility/music/getMusicTextDisplay';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import { chordVoicingSettings } from '../utility/exerciseAttributes/chordProgressionExercise';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import {
  RomanAnalysisChordProgressionExerciseSettings,
  RomanNumeralsChordProgressionQuestion,
  allRomanNumeralAnswerList,
  romanAnalysisChordProgressionExercise,
} from '../utility/exerciseAttributes/romanAnalysisChordProgressionExercise';
import { analyzeBySettings } from '../utility/settings/AnalyzeBySettings';
import { withSettings } from '../utility/settings/withSettings';
import { CommonChordProgressionsExplanationComponent } from './common-chord-progressions-explanation/common-chord-progressions-explanation.component';
import {
  ProgressionDescriptor,
  commonProgressionDescriptorList,
} from './commonProgressions';

type CommonChordProgressionExerciseSettings =
  RomanAnalysisChordProgressionExerciseSettings & {
    includedProgressions: string[];
    tonicForAnalyzing: 'major' | 'original';
  };

export function commonChordProgressionExercise() {
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
          settings.tonicForAnalyzing !== 'original' &&
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

  return composeExercise(
    withSettings(analyzeBySettings),
    withSettings({
      settingsDescriptors: [
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
      defaultSettings: {
        includedProgressions: defaultProgressions,
      },
    }),
    romanAnalysisChordProgressionExercise({
      voicingSettings: false,
    }),
    chordVoicingSettings(),
    () => ({
      answerList(settings: CommonChordProgressionExerciseSettings) {
        const includedAnswers: RomanNumeralChordSymbol[] = _.uniq(
          _.flatMap(
            getIncludedProgressionsDescriptors(settings),
            'romanNumerals',
          ),
        );
        return Exercise.filterIncludedAnswers(
          allRomanNumeralAnswerList,
          includedAnswers,
        );
      },
    }),
    createExercise,
  )({
    id: 'commonChordProgression',
    name: 'Common Progressions',
    summary:
      'Practice on recognizing the most common chord progression in popular music.',
    explanation: CommonChordProgressionsExplanationComponent,
    getChordProgressionInRomanNumerals(
      settings: CommonChordProgressionExerciseSettings,
    ): RomanNumeralsChordProgressionQuestion {
      const includedProgressions: ProgressionDescriptor[] =
        getIncludedProgressionsDescriptors(settings);
      const selectedChordProgression = randomFromList(includedProgressions);
      settings.cadenceType = {
        [Mode.Dorian]: 'i iv V i',
        [Mode.Minor]: 'i iv V i',
        [Mode.Major]: 'I IV V I',
        [Mode.Mixolydian]: 'I IV V I',
      }[selectedChordProgression.mode ?? Mode.Major];
      return {
        chordProgressionInRomanAnalysis: selectedChordProgression.romanNumerals,
      };
    },
  });
}
