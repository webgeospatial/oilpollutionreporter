import { TestBed } from '@angular/core/testing';

import { GetlocationsService } from './getlocations.service';

describe('GetlocationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetlocationsService = TestBed.get(GetlocationsService);
    expect(service).toBeTruthy();
  });
});
