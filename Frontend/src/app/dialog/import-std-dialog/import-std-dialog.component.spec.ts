import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportStdDialogComponent } from './import-std-dialog.component';

describe('ImportStdDialogComponent', () => {
  let component: ImportStdDialogComponent;
  let fixture: ComponentFixture<ImportStdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportStdDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportStdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
