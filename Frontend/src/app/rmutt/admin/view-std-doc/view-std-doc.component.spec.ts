import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStdDocComponent } from './view-std-doc.component';

describe('ViewStdDocComponent', () => {
  let component: ViewStdDocComponent;
  let fixture: ComponentFixture<ViewStdDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStdDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStdDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
