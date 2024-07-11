import { TestBed } from '@angular/core/testing';

import { StyleSpotServiceService } from './style-spot-service.service';

describe('StyleSpotServiceService', () => {
  let service: StyleSpotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleSpotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
