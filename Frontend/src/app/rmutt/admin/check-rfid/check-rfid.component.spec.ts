import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRfidComponent } from './check-rfid.component';

describe('CheckRfidComponent', () => {
  let component: CheckRfidComponent;
  let fixture: ComponentFixture<CheckRfidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckRfidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckRfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
