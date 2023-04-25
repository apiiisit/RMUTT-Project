import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointEditDialogComponent } from './point-edit-dialog.component';

describe('PointEditDialogComponent', () => {
  let component: PointEditDialogComponent;
  let fixture: ComponentFixture<PointEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
