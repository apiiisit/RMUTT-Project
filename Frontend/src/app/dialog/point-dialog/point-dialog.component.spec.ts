import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointDialogComponent } from './point-dialog.component';

describe('PointDialogComponent', () => {
  let component: PointDialogComponent;
  let fixture: ComponentFixture<PointDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
