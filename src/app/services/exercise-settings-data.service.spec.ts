import { TestBed } from '@angular/core/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { ExerciseSettingsData } from '../exercise/utility';
import { ExerciseSettingsDataService } from './exercise-settings-data.service';

describe('StorageService', function () {
  let service: ExerciseSettingsDataService;
  let storage: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [ExerciseSettingsDataService],
    });
    service = TestBed.inject(ExerciseSettingsDataService);
    storage = TestBed.inject(Storage);
  });

  it('Should save exercise settings', async () => {
    const exerciseSettingsData: ExerciseSettingsData<{ a: number }> = {
      globalSettings: {
        playCadence: false,
        adaptive: false,
        bpm: 120,
        moveToNextQuestionAutomatically: false,
        revealAnswerAfterFirstMistake: false,
        answerQuestionAutomatically: false,
        instrument: 'piano',
      },
      exerciseSettings: {
        a: 1,
      },
    };
    await service.saveExerciseSettings('exerciseId', exerciseSettingsData);
    const savedSettings = await service.getExerciseSettings('exerciseId');
    expect(savedSettings).toEqual(exerciseSettingsData);
  });
});
