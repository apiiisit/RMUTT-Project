import { TestBed } from '@angular/core/testing';

import { HasAuthGuard } from './has-auth.guard';

describe('HasAuthGuard', () => {
  let guard: HasAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
