import { Component } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss']
})
export class SettingDialogComponent {

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService,
    public formService: FormService,
    public dialogService: DialogService
  ) { }

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
