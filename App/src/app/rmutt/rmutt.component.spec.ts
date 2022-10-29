import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmuttComponent } from './rmutt.component';

describe('RmuttComponent', () => {
  let component: RmuttComponent;
  let fixture: ComponentFixture<RmuttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmuttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmuttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
