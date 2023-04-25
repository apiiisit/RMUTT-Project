import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotAppComponent } from './page-not-app.component';

describe('PageNotAppComponent', () => {
  let component: PageNotAppComponent;
  let fixture: ComponentFixture<PageNotAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
