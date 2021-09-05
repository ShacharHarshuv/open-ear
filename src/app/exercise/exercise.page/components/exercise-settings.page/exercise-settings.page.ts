import {
  Component,
  Input
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormGroup,
  FormControl
} from '../../../../shared/reactive-forms';
import { ExerciseSettings } from '../../../services/exercise-state.service';

interface ExerciseSettingsControls {
  playCadenceOptions: 'ALWAYS' | 'EVERY_NEW_KEY' | 'NEVER' /*| 'EVERY'*/; // todo: add this option in the future
  // playCadenceEvery: number; // todo: add this option in the future
}

export interface ExerciseSettingsData {
  settings: ExerciseSettings,
}

@Component({
  selector: 'app-exercise-settings.page',
  templateUrl: './exercise-settings.page.html',
  styleUrls: ['./exercise-settings.page.scss'],
})
export class ExerciseSettingsPage {
  readonly formGroup = new FormGroup<ExerciseSettingsControls>({
    playCadenceOptions: new FormControl('ALWAYS'),
    // playCadenceEvery: new FormControl(5),
  });

  @Input()
  exerciseName: string;

  @Input()
  set currentSettings(currentSettings: ExerciseSettings) {
    this.formGroup.reset({
      playCadenceOptions: ((): ExerciseSettingsControls['playCadenceOptions'] => {
        switch (currentSettings.playCadence) {
          case true:
            return 'ALWAYS';
          case false:
            return 'NEVER';
          case 'EVERY_NEW_KEY':
            return 'EVERY_NEW_KEY';
          default:
            return 'ALWAYS';
        }
      })(),
    })
  }

  constructor(
    private _modalController: ModalController,
  ) {

  }

  private _getNewSettings(): ExerciseSettings {
    const formGroupValue = this.formGroup.getRawValue();
    return {
      playCadence: ((): ExerciseSettings['playCadence'] => {
        const valueMapping: {[key in ExerciseSettingsControls['playCadenceOptions']]: ExerciseSettings['playCadence']} = {
          EVERY_NEW_KEY: 'EVERY_NEW_KEY',
          ALWAYS: true,
          NEVER: false,
        };
        return valueMapping[formGroupValue.playCadenceOptions];
      })(),
    }
  }

  async close(): Promise<void> {
    const newSettings: ExerciseSettings = this._getNewSettings();
    const exerciseSettingsData: ExerciseSettingsData = {
      settings: newSettings,
    }
    await this._modalController.dismiss(exerciseSettingsData);
  }
}
