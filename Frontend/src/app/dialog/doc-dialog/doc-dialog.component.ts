import { Component, Input } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-doc-dialog',
  templateUrl: './doc-dialog.component.html',
  styleUrls: ['./doc-dialog.component.scss']
})
export class DocDialogComponent {

  @Input() docid!: number;

  submited: boolean = false;

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService,
    public formService: FormService,
    public dialogService: DialogService
  ) { }

  submit() {
    this.submited = true;
    if (this.formService.docForm.invalid) return;

    if (this.formService.mode === 'new') {
      this.rmuttService.addDoc(this.formService.docForm.value).subscribe({
        complete: () => {
          this.alertService.sweetalertTime('success', 'บันทึกรายการเอกสารสำเร็จ').then(() => {
            window.location.reload();
          });
        },
        error: () => {
          this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด');
        }
      });
    } else {
      this.rmuttService.editDoc(this.docid, this.formService.docForm.value.name).subscribe({
        complete: () => {
          this.alertService.sweetalertTime('success', 'บันทึกรายการเอกสารสำเร็จ').then(() => {
            window.location.reload();
          });
        },
        error: () => {
          this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด');
        }
      });
    }

  }


}
