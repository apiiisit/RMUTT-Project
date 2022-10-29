import { TestBed } from '@angular/core/testing';

import { RmuttService } from './rmutt.service';

describe('RmuttService', () => {
  let service: RmuttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmuttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
