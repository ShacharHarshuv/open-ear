import {
  BaseRomanAnalysisChordProgressionExercise,
  BaseRomanAnalysisChordProgressionExerciseSettings,
  RomanNumeralChord,
  RomanNumeralsChordProgressionQuestion
} from '../utility/BaseRomanAnalysisChordProgressionExercise';
import { Exercise } from '../../Exercise';
import { randomFromList } from '../../../shared/ts-utility';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import {
  CommonChordProgressionsExplanationComponent
} from './common-chord-progressions-explanation/common-chord-progressions-explanation.component';

type CommonChordProgressionExerciseSettings = BaseRomanAnalysisChordProgressionExerciseSettings & {
  includedProgressions: string[];
};

interface ProgressionDescriptor {
  romanNumerals: RomanNumeralChord[],
  name?: string,
}

export class CommonChordProgressionsExercise extends BaseRomanAnalysisChordProgressionExercise<CommonChordProgressionExerciseSettings> {
  private static readonly _progression: ProgressionDescriptor[] = [
    {
      romanNumerals: ['I', 'V', 'I'],
      name: 'Perfect Cadence'
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
      romanNumerals: ['I', 'V', 'IV', 'I'],
      name: 'Blues Cadence',
    },
    {
      romanNumerals: ['I', 'V', 'vi', 'IV'],
      name: 'Axis (optimistic)',
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
      romanNumerals: ['I', 'vi', 'IV', 'V'],
      name: 'Doo-Wop / 50s',
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
    }
  ]

  private static readonly _defaultProgressions: string[] = [
    'I V vi IV',
    'I vi IV V',
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
    return {
      chordProgressionInRomanAnalysis: randomFromList(includedProgressions.map(progression => progression.romanNumerals))
    };
  }

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<CommonChordProgressionExerciseSettings>[] {
    return [
      {
        key: 'includedProgressions',
        descriptor: {
          controlType: 'LIST_SELECT',
          label: 'Included Options',
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
      this.updateSettings({
        ...this._settings,
        includedAnswers: _.uniq(_.flatMap(this._getIncludedProgressionsDescriptors(), 'romanNumerals'))
      })
    })
  }

  private _getIncludedProgressionsDescriptors(): ProgressionDescriptor[] {
    return CommonChordProgressionsExercise._progression.filter(progression => {
      return this._settings.includedProgressions.includes(CommonChordProgressionsExercise._getProgressionId(progression));
    })
  }
}
