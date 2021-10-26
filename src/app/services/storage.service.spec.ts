import { StorageService } from './storage.service';
import { TestBed } from '@angular/core/testing';
import {
  IonicStorageModule,
  Storage,
} from '@ionic/storage-angular';
import { ExerciseSettingsData } from '../exercise/utility';

describe('StorageService', function() {
  let service: StorageService;
  let storage: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicStorageModule.forRoot(),
      ],
      providers: [
        StorageService,
      ]
    });
    service = TestBed.inject(StorageService);
    storage = TestBed.inject(Storage);
  })

  it('Should save exercise settings', async () => {
    const exerciseSettingsData: ExerciseSettingsData = {
      globalSettings: {
        playCadence: false,
        adaptive: false,
      },
      exerciseSettings: {
        a: 1,
      }
    }
    await service.saveExerciseSettings('exerciseId', exerciseSettingsData);
    const savedSettings = await service.getExerciseSettings('exerciseId');
    expect(savedSettings).toEqual(exerciseSettingsData);
  });
});
