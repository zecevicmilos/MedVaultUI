import { TestBed } from '@angular/core/testing';

import { ConsentsService } from './consents.service';

describe('ConsentsService', () => {
  let service: ConsentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
