import { Component, Input } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-point-dialog',
  templateUrl: './point-dialog.component.html',
  styleUrls: ['./point-dialog.component.scss']
})
export class PointDialogComponent {

  @Input() eventId!: number;

  pointName!: string;
  submited!: boolean;

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService,
    public dialogService: DialogService
  ) { }

  submit() {
    this.submited = true;
    if (!this.pointName) return;
    
    this.rmuttService.addPoint([{ name: this.pointName, eventid: this.eventId }]).subscribe({
      complete: () => {
        this.alertService.sweetalertTime('success', 'เพิ่มจุดสแกนสำเร็จ').then(() => {
          window.location.reload();
        });
      },
      error: () => {
        this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด');
      }
    });
  }

}
