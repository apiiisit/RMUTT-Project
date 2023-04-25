import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStdComponent } from './view-std.component';

describe('ViewStdComponent', () => {
  let component: ViewStdComponent;
  let fixture: ComponentFixture<ViewStdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
