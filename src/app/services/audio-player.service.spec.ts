import { TestBed } from '@angular/core/testing';

import { AudioPlayerService } from './audio-player.service';

describe('AudioPlayerService', () => {
  let service: AudioPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
