import { TestBed } from '@angular/core/testing';

import { RoutineServiceService } from './routine-service.service';

describe('RoutineServiceService', () => {
  let service: RoutineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
