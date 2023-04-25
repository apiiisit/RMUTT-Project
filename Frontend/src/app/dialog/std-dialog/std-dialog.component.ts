import { Component } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { MockService } from 'src/app/service/mock.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-std-dialog',
  templateUrl: './std-dialog.component.html',
  styleUrls: ['./std-dialog.component.scss']
})
export class StdDialogComponent {

  degrees: string[] = [];
  prefixnames: string[] = [];
  facultys: string[] = [];
  awards: string[] = [];

  submitted: boolean = false;

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService,
    private mockService: MockService,
    public dialogService: DialogService,
    public formService: FormService
  ) { }

  ngOnInit(): void {
    this.degrees = this.mockService.degrees;
    this.prefixnames = this.mockService.prefixnames;
    this.facultys = this.mockService.facultys;
    this.awards = this.mockService.awards;
  }

  btnSave() {
    this.submitted = true;
    if (this.formService.stdForm.invalid) return;

    // convert str to num
    Object.keys(this.formService.stdForm.value).map(key => {
      if (['row', 'rowfaculty', 'honor'].includes(key)) {
        this.formService.stdForm.value[key] = +this.formService.stdForm.value[key];
      }
    });

    if (this.formService.mode === 'new') {
      this.rmuttService.addStd([this.formService.stdForm.value]).subscribe({
        complete: () => {
          this.alertService.sweetalertTime('success', 'เพิ่มบัณฑิตสำเร็จ').then(() => {
            this.dialogService.stdDialog = false;
            window.location.reload();
          });
        },
        error: () => {
          this.alertService.sweetalert('error', 'เพิ่มบัณฑิตไม่สำเร็จ');
        }
      });

    } else { // mode edit
      const form = {id: this.formService.stdForm.get('id')?.value, ...this.formService.stdForm.value};
      this.rmuttService.editStd(form).subscribe({
        complete: () => {
          this.alertService.sweetalertTime('success', 'แก้ไขข้อมูลบัณฑิตสำเร็จ').then(() => {
            this.dialogService.stdDialog = false;
            window.location.reload();
          });
        },
        error: () => {
          this.alertService.sweetalert('error', 'แก้ไขบัณฑิตไม่สำเร็จ');
        }
      });
    }

  }

}
