import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdDialogComponent } from './std-dialog.component';

describe('StdDialogComponent', () => {
  let component: StdDialogComponent;
  let fixture: ComponentFixture<StdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
