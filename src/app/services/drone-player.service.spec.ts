import { TestBed } from '@angular/core/testing';

import { DronePlayerService } from './drone-player.service';

describe('DroneService', () => {
  let service: DronePlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DronePlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
