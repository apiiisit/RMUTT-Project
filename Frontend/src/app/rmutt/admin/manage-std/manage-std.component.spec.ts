import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStdComponent } from './manage-std.component';

describe('ManageStdComponent', () => {
  let component: ManageStdComponent;
  let fixture: ComponentFixture<ManageStdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
