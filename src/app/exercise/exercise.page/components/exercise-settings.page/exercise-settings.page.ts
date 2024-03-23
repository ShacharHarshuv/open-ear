import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { samples } from 'generated/samples';
import * as _ from 'lodash';
import { capitalize } from 'lodash';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { InstrumentName } from '../../../../services/player.service';
import { collapseVertical } from '../../../../shared/animations';
import { ModalFrameComponent } from '../../../../shared/modal/modal-frame/modal-frame.component';
import { PureFunctionPipe } from '../../../../shared/ng-utilities/pure-function-pipe/pure-function.pipe';
import {
  FormControl,
  FormGroup,
  TAbstractControlsOf,
} from '../../../../shared/reactive-forms';
import { keys } from '../../../../shared/ts-utility/keys';
import Exercise, {
  ControlDescriptor,
  IncludedAnswersControlDescriptor,
  ListSelectControlDescriptor,
  SelectControlDescriptor,
  SliderControlDescriptor,
} from '../../../exercise-logic';
import {
  ExerciseSettingsData,
  GlobalExerciseSettings,
  toGetter,
} from '../../../utility';
import { FieldInfoComponent } from './components/field-info/field-info.component';
import { IncludedAnswersComponent } from './components/included-answers/included-answers.component';
import { ListSelectComponent } from './components/list-select/list-select.component';
import { ExerciseControlDirective } from './directives/exercise-control.directive';
import SettingValueType = Exercise.SettingValueType;
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;

/**
 * TODO: consider making the form generation more generic, so that we won't have to repeat ourselves so many times
 * */
interface ExerciseSettingsControls
  extends Omit<GlobalExerciseSettings, 'playCadence'> {
  playCadenceOptions:
    | 'ALWAYS'
    | 'ONLY_ON_REPEAT'
    | /*'EVERY_NEW_KEY' TODO(OE-12) |*/ 'NEVER' /*| 'EVERY TODO(OE-13)'*/;
}

@Component({
  selector: 'app-exercise-settings.page',
  templateUrl: './exercise-settings.page.html',
  styleUrls: ['./exercise-settings.page.scss'],
  animations: [collapseVertical],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FieldInfoComponent,
    IncludedAnswersComponent,
    ExerciseControlDirective,
    ListSelectComponent,
    ModalFrameComponent,
    ReactiveFormsModule,
    PureFunctionPipe,
  ],
})
export class ExerciseSettingsPage {
  readonly generalFormGroup = new FormGroup<ExerciseSettingsControls>({
    playCadenceOptions: new FormControl('ALWAYS'),
    // playCadenceEvery: new FormControl(5),
    adaptive: new FormControl(false),
    revealAnswerAfterFirstMistake: new FormControl(false),
    bpm: new FormControl<number>(120),
    moveToNextQuestionAutomatically: new FormControl(false),
    answerQuestionAutomatically: new FormControl(false),
    instrument: new FormControl<InstrumentName>(),
    playWrongAnswer: new FormControl(false),
  });

  exerciseSettingsDescriptor: Exercise.SettingsControlDescriptor[] = [];
  // @ts-ignore
  exerciseFormGroup: FormGroup<{ [key: string]: FormControl }>;

  readonly instrumentOptions = this._getInstrumentOptions();

  @Input({ required: true })
  exercise!: Pick<Exercise.Exercise, 'name' | 'isPlayWrongAnswerSupported'>;

  @Input()
  set currentGlobalSettings(currentSettings: GlobalExerciseSettings) {
    this.generalFormGroup.reset({
      ...currentSettings,
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
    });
  }

  @Input()
  set currentExerciseSettings(currentSettings: {
    [key: string]: SettingValueType;
  }) {
    this.exerciseFormGroup.reset(currentSettings);
  }

  @Input()
  allAvailableAnswers: string[] = [];

  getControlDescriptorStream = (
    settings: SettingsControlDescriptor,
  ): Observable<Exercise.ControlDescriptor> => {
    if (settings.descriptor instanceof Function) {
      return this.exerciseFormGroup.value$.pipe(
        map((value) => {
          return toGetter(settings.descriptor)(value);
        }),
        distinctUntilChanged(_.isEqual),
      );
    }

    return of(settings.descriptor);
  };

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('exerciseSettingsDescriptor')
  set exerciseSettingsDescriptorInput(
    settingsDescriptor: Exercise.SettingsControlDescriptor[],
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
      ...formGroupValue,
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
    };
  }

  isShowExerciseControl(
    controlDescriptor: Exercise.SettingsControlDescriptor,
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
        }) as const,
    );
  }

  asListSelectControlDescriptor(
    descriptor: ControlDescriptor,
  ): ListSelectControlDescriptor {
    if (descriptor.controlType !== 'list-select') {
      throw new Error(
        `Descriptor ${JSON.stringify(
          descriptor,
        )} is not a ListSelectControlDescriptor`,
      );
    }
    return descriptor;
  }

  asSliderControlDescriptor(
    descriptor: ControlDescriptor,
  ): SliderControlDescriptor {
    if (descriptor.controlType !== 'slider') {
      throw new Error(
        `Descriptor ${JSON.stringify(
          descriptor,
        )} is not a ListSelectControlDescriptor`,
      );
    }
    return descriptor;
  }

  asIncludedAnswersControlDescriptor(
    descriptor: ControlDescriptor,
  ): IncludedAnswersControlDescriptor {
    if (descriptor.controlType !== 'included-answers') {
      throw new Error(
        `Descriptor ${JSON.stringify(
          descriptor,
        )} is not a IncludedAnswersControlDescriptor`,
      );
    }
    return descriptor;
  }

  asSelectControlDescriptor(
    descriptor: ControlDescriptor,
  ): SelectControlDescriptor {
    if (descriptor.controlType !== 'select') {
      throw new Error(
        `Descriptor ${JSON.stringify(
          descriptor,
        )} is not a SelectControlDescriptor`,
      );
    }
    return descriptor;
  }
}
