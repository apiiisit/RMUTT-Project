import { Component } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { FormService } from 'src/app/service/form.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

  constructor(
    private rmuttService: RmuttService,
    public formService: FormService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.rmuttService.settings().subscribe({
      next: (res) => {
        this.formService.settingForm.setValue({
          title: res.data.title,
          subtitle: res.data.subtitle
        });
      }
    });
  }

  editSetting() {

    if (this.formService.settingForm.invalid) return;
    this.rmuttService.updateSetting(this.formService.settingForm.value).subscribe({
      complete: () => {
        this.alertService.sweetalertTime('success', 'บันทึกการตั้งค่าสำเร็จ').then(() => {
          window.location.reload();
        });
      },
      error: () => {
        this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด');
      }
    });

  }

}
