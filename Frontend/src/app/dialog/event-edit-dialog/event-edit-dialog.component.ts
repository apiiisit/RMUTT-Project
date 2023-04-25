import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-event-edit-dialog',
  templateUrl: './event-edit-dialog.component.html',
  styleUrls: ['./event-edit-dialog.component.scss']
})
export class EventEditDialogComponent {

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService,
    public formService: FormService,
    public dialogService: DialogService,
    private router: Router
  ) { }

  editEvent() {
    this.rmuttService.editEvent(this.formService.eventEditForm.value).subscribe({
      complete: () => {
        this.alertService.sweetalertTime('success', 'บันทึกชื่อสำเร็จ').then(() => {
          this.router.navigate(['admin']).then(() => window.location.reload());
        });
      },
      error: () => {
        this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด');
      }
    });
  }
}
