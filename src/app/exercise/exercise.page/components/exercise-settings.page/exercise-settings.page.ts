import {
  Component,
  Input
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  TAbstractControlsOf
} from '../../../../shared/reactive-forms';
import { Exercise, } from '../../../Exercise';
import SettingValueType = Exercise.SettingValueType;
import {
  GlobalExerciseSettings,
  ExerciseSettingsData,
} from '../../../utility';

interface ExerciseSettingsControls {
  playCadenceOptions: 'ALWAYS' | 'ONLY_ON_REPEAT' | /*'EVERY_NEW_KEY' TODO(OE-12) |*/ 'NEVER' /*| 'EVERY TODO(OE-13)'*/;
  // playCadenceEvery: number; // todo(OE-13)
  adaptive: boolean,
}

@Component({
  selector: 'app-exercise-settings.page',
  templateUrl: './exercise-settings.page.html',
  styleUrls: ['./exercise-settings.page.scss'],
})
export class ExerciseSettingsPage {
  readonly generalFormGroup = new FormGroup<ExerciseSettingsControls>({
    playCadenceOptions: new FormControl('ALWAYS'),
    // playCadenceEvery: new FormControl(5),
    adaptive: new FormControl<boolean>(false,)
  });

  exerciseSettingsDescriptor: Exercise.SettingsControlDescriptor[];
  exerciseFormGroup: FormGroup<{[key: string]: FormControl}>;

  @Input()
  exerciseName: string;

  @Input()
  set currentGlobalSettings(currentSettings: GlobalExerciseSettings) {
    this.generalFormGroup.reset({
      playCadenceOptions: ((): ExerciseSettingsControls['playCadenceOptions'] => {
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
    })
  }

  @Input()
  set currentExerciseSettings(currentSettings: { [key: string]: SettingValueType }) {
    this.exerciseFormGroup.reset(currentSettings);
  }

  @Input()
  allAvailableAnswers: string[];

  @Input('exerciseSettingsDescriptor')
  set exerciseSettingsDescriptorInput(settingsDescriptor: Exercise.SettingsControlDescriptor[]) {
    this.exerciseSettingsDescriptor = settingsDescriptor;
    const controls: TAbstractControlsOf<{[key: string]: any}, {}> = {};
    for (let settingsControlDescriptor of settingsDescriptor) {
      controls[settingsControlDescriptor.key] = new FormControl();
    }
    this.exerciseFormGroup = new FormGroup(controls);
  }

  constructor(
    private _modalController: ModalController,
  ) {
  }

  async close(): Promise<void> {
    const newGlobalSettings: GlobalExerciseSettings = this._getNewSettings();
    const exerciseSettingsData: ExerciseSettingsData = {
      globalSettings: newGlobalSettings,
      exerciseSettings: this.exerciseFormGroup.getRawValue(),
    }
    await this._modalController.dismiss(exerciseSettingsData);
  }

  private _getNewSettings(): GlobalExerciseSettings {
    const formGroupValue = this.generalFormGroup.getRawValue();
    return {
      playCadence: ((): GlobalExerciseSettings['playCadence'] => {
        const valueMapping: { [key in ExerciseSettingsControls['playCadenceOptions']]: GlobalExerciseSettings['playCadence'] } = {
          // EVERY_NEW_KEY: 'EVERY_NEW_KEY', // TODO(OE-12)
          ALWAYS: true,
          NEVER: false,
          ONLY_ON_REPEAT: 'ONLY_ON_REPEAT',
        };
        return valueMapping[formGroupValue.playCadenceOptions];
      })(),
      adaptive: formGroupValue.adaptive,
    }
  }
}
