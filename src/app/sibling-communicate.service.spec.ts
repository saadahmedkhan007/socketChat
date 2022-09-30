import { TestBed } from '@angular/core/testing';

import { SiblingCommunicateService } from './sibling-communicate.service';

describe('SiblingCommunicateService', () => {
  let service: SiblingCommunicateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiblingCommunicateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
