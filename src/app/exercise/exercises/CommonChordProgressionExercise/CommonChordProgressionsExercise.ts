import {
  BaseRomanAnalysisChordProgressionExercise,
  BaseRomanAnalysisChordProgressionExerciseSettings,
  RomanNumeralsChordProgressionQuestion
} from '../utility/base-exercises/BaseRomanAnalysisChordProgressionExercise';
import { Exercise } from '../../Exercise';
import { randomFromList } from '../../../shared/ts-utility';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import {
  CommonChordProgressionsExplanationComponent
} from './common-chord-progressions-explanation/common-chord-progressions-explanation.component';
import { CadenceType } from '../utility/base-exercises/BaseTonalExercise';
import { RomanNumeralChord } from '../../utility';

type CommonChordProgressionExerciseSettings = BaseRomanAnalysisChordProgressionExerciseSettings & {
  includedProgressions: string[];
};

interface ProgressionDescriptor {
  romanNumerals: RomanNumeralChord[],
  name?: string,
  cadenceType?: CadenceType,
}

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
      romanNumerals: ['V', 'vi', 'IV', 'I'],
      name: 'Axis'
    },
    {
      romanNumerals: ['vi', 'IV', 'I', 'V'],
      name: 'Axis (pessimistic)',
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
      romanNumerals: ['I', 'vi', 'iii'],
      name: 'Circle'
    },
    {
      romanNumerals: ['I', 'vi', 'iii'],
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
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'iv', 'i'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'iv', 'V', 'i'],
      name: 'Minor Classical Cadence',
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'bVII', 'bVI', 'i'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['bVI', 'i', 'bVII', 'i'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'bVII', 'bVI', 'bVII'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'bVI', 'bIII', 'bVII'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'bVII', 'bVI', 'V'],
      name: 'Andalusian Cadence',
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'bIII', 'iv', 'bVII'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'bIII', 'bVI', 'V'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['iidim', 'V', 'i'],
      name: 'Minor 2-5-1',
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'iv', 'bVI', 'V', 'i'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'iv', 'v'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'bVI', 'bIII', 'iv'],
      cadenceType: 'i iv V i',
    },
    {
      romanNumerals: ['i', 'bVII', 'v', 'bVI'],
      cadenceType: 'i iv V i',
      name: '"Can\'t Stop"'
    },
    // Diatonic Dorian progressions
    {
      romanNumerals: ['i', 'IV', 'i', 'IV'],
      cadenceType: 'i iv V i',
      name: 'Dorian Vamp'
    },
    {
      romanNumerals: ['i', 'bIII', 'bVI', 'IV'],
      cadenceType: 'i iv V i',
      name: 'Plagal Cascade',
    },
    // Non-diatonic progressions
    {
      romanNumerals: ['I', 'IV', 'iv', 'I'],
      name: 'Minor Plagal Cadence',
    },
    {
      romanNumerals: ['I', 'III', 'vi', 'IV'],
    },
    {
      romanNumerals: ['I', 'VI', 'ii', 'V'],
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
    this._startIncludedProgressionsChangeHandler();
  }

  protected _getChordProgressionInRomanNumerals(): RomanNumeralsChordProgressionQuestion {
    const includedProgressions: ProgressionDescriptor[] = this._getIncludedProgressionsDescriptors();
    const selectedChordProgression = randomFromList(includedProgressions);
    this._settings.cadenceType = selectedChordProgression.cadenceType ?? 'I IV V I';
    return {
      chordProgressionInRomanAnalysis: selectedChordProgression.romanNumerals,
    };
  }

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<CommonChordProgressionExerciseSettings>[] {
    return [
      {
        key: 'includedProgressions',
        descriptor: {
          controlType: 'LIST_SELECT',
          label: 'Included Progressions',
          allOptions: CommonChordProgressionsExercise._progression.map(progression => ({
            value: CommonChordProgressionsExercise._getProgressionId(progression),
            label: CommonChordProgressionsExercise._getProgressionId(progression) + (progression.name ? ` (${progression.name})` : ''),
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

  private _startIncludedProgressionsChangeHandler(): void {
    this._settings$.pipe(
      map(settings => settings.includedProgressions),
      startWith(CommonChordProgressionsExercise._defaultProgressions),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    ).subscribe(() => {
      const newIncludedAnswers: RomanNumeralChord[] = _.uniq(_.flatMap(this._getIncludedProgressionsDescriptors(), 'romanNumerals'));
      this.updateSettings({
        ...this._settings,
        includedAnswers: newIncludedAnswers,
      })
    })
  }

  private _getIncludedProgressionsDescriptors(): ProgressionDescriptor[] {
    return CommonChordProgressionsExercise._progression.filter(progression => {
      return this._settings.includedProgressions.includes(CommonChordProgressionsExercise._getProgressionId(progression));
    })
  }
}
