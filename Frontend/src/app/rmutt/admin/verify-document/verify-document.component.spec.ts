import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDocumentComponent } from './verify-document.component';

describe('VerifyDocumentComponent', () => {
  let component: VerifyDocumentComponent;
  let fixture: ComponentFixture<VerifyDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
