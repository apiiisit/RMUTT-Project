import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduationRehearsalComponent } from './graduation-rehearsal.component';

describe('GraduationRehearsalComponent', () => {
  let component: GraduationRehearsalComponent;
  let fixture: ComponentFixture<GraduationRehearsalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduationRehearsalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduationRehearsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
