import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDialogComponent } from './doc-dialog.component';

describe('DocDialogComponent', () => {
  let component: DocDialogComponent;
  let fixture: ComponentFixture<DocDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
