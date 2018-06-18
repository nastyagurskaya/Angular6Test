import { TestBed, inject } from '@angular/core/testing';

import { UserboardService } from './userboard.service';

describe('UserboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserboardService]
    });
  });

  it('should be created', inject([UserboardService], (service: UserboardService) => {
    expect(service).toBeTruthy();
  }));
});
