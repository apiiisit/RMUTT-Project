import { Component } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-point-edit-dialog',
  templateUrl: './point-edit-dialog.component.html',
  styleUrls: ['./point-edit-dialog.component.scss']
})
export class PointEditDialogComponent {

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService,
    public formService: FormService,
    public dialogService: DialogService
  ) { }

  submit() {
    if (this.formService.pointForm.invalid) return;

    this.rmuttService.editPoint(this.formService.pointForm.value).subscribe({
      complete: () => {
        this.alertService.sweetalertTime('success', 'บันทึกชื่อจุดสแกนสำเร็จ').then(() => {
          window.location.reload();
        });
      },
      error: () => {
        this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด');
      }
    });

  }

}
