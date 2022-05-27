import {
  BaseRomanAnalysisChordProgressionExercise,
  BaseRomanAnalysisChordProgressionExerciseSettings,
  RomanNumeralsChordProgressionQuestion,
} from '../utility/base-exercises/BaseRomanAnalysisChordProgressionExercise';
import { Exercise } from '../../Exercise';
import { randomFromList } from '../../../shared/ts-utility';
import * as _ from 'lodash';
import { CommonChordProgressionsExplanationComponent } from './common-chord-progressions-explanation/common-chord-progressions-explanation.component';
import {
  RomanNumeralChordSymbol,
  Mode,
} from '../../utility';
import { toMusicalTextDisplay } from '../../utility/music/getMusicTextDisplay';
import { SettingsDescriptors } from '../utility/settings/SettingsDescriptors';

type CommonChordProgressionExerciseSettings = BaseRomanAnalysisChordProgressionExerciseSettings & {
  includedProgressions: string[];
  tonicForAnalyzing: 'major' | 'original';
};

interface ProgressionDescriptor {
  romanNumerals: RomanNumeralChordSymbol[],
  name?: string,
  mode?: Mode,
}

@SettingsDescriptors<CommonChordProgressionExerciseSettings>({
  defaultValue: 'original',
  key: 'tonicForAnalyzing',
  info: 'Determines how chord progression in different modes are analyzed. <br>' +
    'For example - Am G F G Am can be analyzed in relation to its "True Tonic" tonic in A-Minor: i bVII bVI bVII i, or in its relative "Major Tonic" - vi V IV V vi. Some musicians can find it useful to use the relative major analysis for all modes.',
  descriptor: {
    label: 'Analyze By',
    controlType: 'select',
    options: [
      {
        label: 'Relative Major Tonic',
        value: 'major',
      },
      {
        label: 'True Tonic',
        value: 'original',
      }
    ]
  }
})
export class CommonChordProgressionsExercise extends BaseRomanAnalysisChordProgressionExercise<CommonChordProgressionExerciseSettings> {
  private static readonly _progression: ProgressionDescriptor[] = [
    // Diatonic Major progressions
    {
      romanNumerals: ['I', 'V', 'I'],
      name: 'Perfect Cadence (Major)'
    },
    {
      romanNumerals: ['I', 'IV', 'I'],
      name: 'Plagal Cadence',
    },
    {
      romanNumerals: ['I', 'IV', 'V', 'I'],
      name: 'Classical Cadence',
    },
    {
      romanNumerals: ['I', 'IV', 'V', 'IV'],
    },
    {
      romanNumerals: ['I', 'V', 'IV', 'V'],
    },
    {
      romanNumerals: ['I', 'V', 'IV', 'I'],
      name: 'Blues Cadence',
    },
    {
      romanNumerals: ['I', 'V', 'vi', 'IV'],
      name: 'Axis (optimistic)',
    },
    {
      romanNumerals: ['IV', 'I', 'V', 'vi'],
      name: 'Axis'
    },
    {
      romanNumerals: ['I', 'IV', 'vi', 'V',]
    },
    {
      romanNumerals: ['I', 'vi', 'IV', 'V'],
      name: 'Doo-Wop / 50s',
    },
    {
      romanNumerals: ['IV', 'V', 'I', 'vi'],
      name: 'Doo-Wop (IV-rotation)'
    },
    {
      romanNumerals: ['I', 'vi', 'ii', 'V'],
      name: 'Circle'
    },
    {
      romanNumerals: ['I', 'vi', 'iii', 'IV'],
    },
    {
      romanNumerals: ['I', 'V', 'ii', 'IV']
    },
     // Diatonic Minor (Harmonic / Natural) progressions
    {
      romanNumerals: ['i', 'V', 'i'],
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'iv', 'i'],
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'iv', 'V', 'i'],
      name: 'Minor Classical Cadence',
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'V', 'iv', 'i'],
      name: 'Minor Blues Cadence',
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'V', 'iv', 'V', 'i'],
      name: 'Minor Blues Cadence',
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'bVII', 'bVI', 'i'],
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'bVII', 'bVI', 'bVII'],
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'bVI', 'bIII', 'bVII'],
      mode: Mode.Minor,
      name: 'Axis (Pessimistic)'
    },
    {
      romanNumerals: ['i', 'bVII', 'bVI', 'V'],
      name: 'Andalusian Cadence',
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'bIII', 'iv', 'bVII'],
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'bIII', 'bVI', 'V'],
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['iidim', 'V', 'i'],
      name: 'Minor 2-5-1',
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'iidim', 'V', 'i'],
      name: 'Minor 2-5-1',
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'iv', 'bVI', 'V', 'i'],
      mode: Mode.Minor,
    },
    {
      romanNumerals: ['i', 'bVII', 'v', 'bVI'],
      mode: Mode.Minor,
      name: '"Can\'t Stop"'
    },
    // Diatonic Dorian progressions
    {
      romanNumerals: ['i', 'IV', 'i', 'IV'],
      mode: Mode.Dorian,
      name: 'Dorian Vamp'
    },
    {
      romanNumerals: ['i', 'bIII', 'bVI', 'IV'],
      mode: Mode.Dorian,
      name: 'Plagal Cascade',
    },
    // Diatonic Mixolydian
    {
      romanNumerals: ['I', 'bVI', 'IV', 'I'],
      name: 'Mixolydian Vamp',
      mode: Mode.Mixolydian,
    },
    {
      romanNumerals: ['I', 'v', 'v', 'ii'],
      name: 'Clocks'
    },
    // Non-diatonic progressions
    // Modal interchange
    {
      romanNumerals: ['I', 'IV', 'iv', 'I'],
      name: 'Minor Plagal Cadence',
    },
    {
      romanNumerals: ['I', 'bVI', 'bVII', 'I'],
      name: 'Mario Cadence'
    },
    {
      romanNumerals: ['I', 'bVI', 'V', 'I'],
      name: 'Secondary triton sub'
    },
    // secondary dominants
    {
      romanNumerals: ['I', 'III', 'vi', 'IV'],
    },
    {
      romanNumerals: ['I', 'VI', 'ii', 'V'],
    },
    {
      romanNumerals: ['I', 'IV', '#ivdim', 'V']
    },
    {
      romanNumerals: ['I', 'V', 'III', 'vi']
    },
    
  ]

  private static readonly _defaultProgressions: string[] = [
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
  ]

  private static _getProgressionId(progression: ProgressionDescriptor): string {
    return progression.romanNumerals.join(' ');
  }

  readonly explanation: Exercise.ExerciseExplanationContent = CommonChordProgressionsExplanationComponent;
  readonly id: string = 'commonChordProgression'
  readonly name: string = 'Common Progressions'
  readonly summary: string = 'Practice on recognizing the most common chord progression in popular music.'

  constructor() {
    super();
  }

  protected _getChordProgressionInRomanNumerals(): RomanNumeralsChordProgressionQuestion {
    const includedProgressions: ProgressionDescriptor[] = this._getIncludedProgressionsDescriptors();
    const selectedChordProgression = randomFromList(includedProgressions);
    this._settings.cadenceType = {
      [Mode.Dorian]: 'i iv V i',
      [Mode.Minor]: 'i iv V i',
      [Mode.Major]: 'I IV V I',
      [Mode.Mixolydian]: 'I IV V I',
    }[selectedChordProgression.mode ?? Mode.Major];
    return {
      chordProgressionInRomanAnalysis: selectedChordProgression.romanNumerals,
    };
  }

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<CommonChordProgressionExerciseSettings>[] {
    return [
      {
        key: 'includedProgressions',
        descriptor: {
          controlType: 'list-select',
          label: 'Included Progressions',
          allOptions: CommonChordProgressionsExercise._progression.map(progression => ({
            value: CommonChordProgressionsExercise._getProgressionId(progression),
            label: toMusicalTextDisplay(CommonChordProgressionsExercise._getProgressionId(progression)) + (progression.name ? ` (${progression.name})` : ''),
          })),
        },
      }
    ];
  }

  protected override _getDefaultSettings(): CommonChordProgressionExerciseSettings {
    return {
      ...super._getDefaultSettings(),
      includedProgressions: CommonChordProgressionsExercise._defaultProgressions,
    }
  }

  protected override _getAnswersListInC(): Exercise.AnswerList<RomanNumeralChordSymbol> {
    const includedAnswers: RomanNumeralChordSymbol[] = _.uniq(_.flatMap(this._getIncludedProgressionsDescriptors(), 'romanNumerals'));
    return Exercise.filterIncludedAnswers(super._getAnswersListInC(), includedAnswers);
  }

  private _getIncludedProgressionsDescriptors(): ProgressionDescriptor[] {
    return CommonChordProgressionsExercise._progression.filter(progression => {
      return this._settings.includedProgressions.includes(CommonChordProgressionsExercise._getProgressionId(progression));
    })
  }
}
