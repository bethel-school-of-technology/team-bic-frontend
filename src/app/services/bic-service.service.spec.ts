import { TestBed } from '@angular/core/testing';

import { BicServiceService } from './bic-service.service';

describe('BicServiceService', () => {
  let service: BicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
