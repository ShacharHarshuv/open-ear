import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  TAbstractControlsOf,
} from '../../../../shared/reactive-forms';
import Exercise from '../../../Exercise';
import {
  ExerciseSettingsData,
  GlobalExerciseSettings,
  toGetter,
} from '../../../utility';
import * as _ from 'lodash';
import { capitalize } from 'lodash';
import { collapseVertical } from '../../../../shared/animations';
import { Observable, of } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { InstrumentName } from '../../../../services/player.service';
import { keys } from '../../../../shared/ts-utility/keys';
import { samples } from 'generated/samples';
import SettingValueType = Exercise.SettingValueType;
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;

/**
 * TODO: consider making the form generation more generic, so that we won't have to repeat ourselves so many times
 * */
interface ExerciseSettingsControls {
  playCadenceOptions:
    | 'ALWAYS'
    | 'ONLY_ON_REPEAT'
    | /*'EVERY_NEW_KEY' TODO(OE-12) |*/ 'NEVER' /*| 'EVERY TODO(OE-13)'*/;
  // playCadenceEvery: number; // todo(OE-13)
  bpm: number;
  moveToNextQuestionAutomatically: boolean;
  answerQuestionAutomatically: boolean;
  adaptive: boolean;
  revealAnswerAfterFirstMistake: boolean;
  instrument: InstrumentName;
}

@Component({
  selector: 'app-exercise-settings.page',
  templateUrl: './exercise-settings.page.html',
  styleUrls: ['./exercise-settings.page.scss'],
  animations: [collapseVertical],
})
export class ExerciseSettingsPage {
  readonly generalFormGroup = new FormGroup<ExerciseSettingsControls>({
    playCadenceOptions: new FormControl('ALWAYS'),
    // playCadenceEvery: new FormControl(5),
    adaptive: new FormControl<boolean>(false),
    revealAnswerAfterFirstMistake: new FormControl<boolean>(false),
    bpm: new FormControl<number>(120),
    moveToNextQuestionAutomatically: new FormControl<boolean>(false),
    answerQuestionAutomatically: new FormControl<boolean>(false),
    instrument: new FormControl<InstrumentName>(),
  });

  exerciseSettingsDescriptor: Exercise.SettingsControlDescriptor[];
  exerciseFormGroup: FormGroup<{ [key: string]: FormControl }>;

  readonly instrumentOptions = this._getInstrumentOptions();

  @Input()
  exerciseName: string;

  @Input()
  set currentGlobalSettings(currentSettings: GlobalExerciseSettings) {
    this.generalFormGroup.reset({
      playCadenceOptions:
        ((): ExerciseSettingsControls['playCadenceOptions'] => {
          switch (currentSettings.playCadence) {
            case true:
              return 'ALWAYS';
            case false:
              return 'NEVER';
            case 'ONLY_ON_REPEAT':
              return 'ONLY_ON_REPEAT';
            // TODO(OE-12)
            // case 'EVERY_NEW_KEY':
            //   return 'EVERY_NEW_KEY';
            default:
              return 'ALWAYS';
          }
        })(),
      adaptive: currentSettings.adaptive,
      revealAnswerAfterFirstMistake:
        currentSettings.revealAnswerAfterFirstMistake,
      bpm: currentSettings.bpm,
      moveToNextQuestionAutomatically:
        currentSettings.moveToNextQuestionAutomatically,
      answerQuestionAutomatically: currentSettings.answerQuestionAutomatically,
      instrument: currentSettings.instrument,
    });
  }

  @Input()
  set currentExerciseSettings(currentSettings: {
    [key: string]: SettingValueType;
  }) {
    this.exerciseFormGroup.reset(currentSettings);
  }

  @Input()
  allAvailableAnswers: string[];

  getControlDescriptorStream = (
    settings: SettingsControlDescriptor
  ): Observable<Exercise.ControlDescriptor> => {
    if (settings.descriptor instanceof Function) {
      return this.exerciseFormGroup.value$.pipe(
        map((value) => {
          return toGetter(settings.descriptor)(value);
        }),
        distinctUntilChanged(_.isEqual)
      );
    }

    return of(settings.descriptor);
  };

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('exerciseSettingsDescriptor')
  set exerciseSettingsDescriptorInput(
    settingsDescriptor: Exercise.SettingsControlDescriptor[]
  ) {
    this.exerciseSettingsDescriptor = settingsDescriptor;
    const controls: TAbstractControlsOf<{ [key: string]: any }, {}> = {};
    for (let settingsControlDescriptor of settingsDescriptor) {
      if (settingsControlDescriptor.key) {
        controls[settingsControlDescriptor.key] = new FormControl();
      }
    }
    this.exerciseFormGroup = new FormGroup(controls);
  }

  async onClose(): Promise<ExerciseSettingsData> {
    const newGlobalSettings: GlobalExerciseSettings = this._getNewSettings();
    const exerciseSettingsData: ExerciseSettingsData = {
      globalSettings: newGlobalSettings,
      exerciseSettings: this.exerciseFormGroup.getRawValue(),
    };
    return exerciseSettingsData;
  }

  private _getNewSettings(): GlobalExerciseSettings {
    const formGroupValue = this.generalFormGroup.getRawValue();
    return {
      playCadence: ((): GlobalExerciseSettings['playCadence'] => {
        const valueMapping: {
          [key in ExerciseSettingsControls['playCadenceOptions']]: GlobalExerciseSettings['playCadence'];
        } = {
          // EVERY_NEW_KEY: 'EVERY_NEW_KEY', // TODO(OE-12)
          ALWAYS: true,
          NEVER: false,
          ONLY_ON_REPEAT: 'ONLY_ON_REPEAT',
        };
        return valueMapping[formGroupValue.playCadenceOptions];
      })(),
      adaptive: formGroupValue.adaptive,
      revealAnswerAfterFirstMistake:
        formGroupValue.revealAnswerAfterFirstMistake,
      bpm: formGroupValue.bpm,
      moveToNextQuestionAutomatically:
        formGroupValue.moveToNextQuestionAutomatically,
      answerQuestionAutomatically: formGroupValue.answerQuestionAutomatically,
      instrument: formGroupValue.instrument,
    };
  }

  isShowExerciseControl(
    controlDescriptor: Exercise.SettingsControlDescriptor
  ): boolean {
    return _.isNil(controlDescriptor.show)
      ? true
      : controlDescriptor.show(this.exerciseFormGroup.value);
  }

  private _getInstrumentOptions() {
    const allInstruments = keys(samples);
    return allInstruments.map(
      (instrumentName) =>
        ({
          value: instrumentName,
          label: capitalize(instrumentName.split('-').join(' ')),
        } as const)
    );
  }
}
