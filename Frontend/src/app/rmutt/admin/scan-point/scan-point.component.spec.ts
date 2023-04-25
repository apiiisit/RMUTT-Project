import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPointComponent } from './scan-point.component';

describe('ScanPointComponent', () => {
  let component: ScanPointComponent;
  let fixture: ComponentFixture<ScanPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
