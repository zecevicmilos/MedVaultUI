import { TestBed } from '@angular/core/testing';

import { IdentityDocsService } from './identity-docs.service';

describe('IdentityDocsService', () => {
  let service: IdentityDocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityDocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
