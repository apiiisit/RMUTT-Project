import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDialogComponent } from './setting-dialog.component';

describe('SettingDialogComponent', () => {
  let component: SettingDialogComponent;
  let fixture: ComponentFixture<SettingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
