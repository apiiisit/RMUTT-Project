import { Component } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {

  static!: string;
  selectedEvent: string[] = [];

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService,
    public dialogService: DialogService
  ) { }

  newEvent() {
    if (this.selectedEvent.length === 0) return;
    this.dialogService.eventDialog = false;
    let events = this.selectedEvent;
    if (this.selectedEvent.includes('static')) {
      if (!this.static?.trim()) return;
      events = this.selectedEvent.filter(x => x != 'static');
      events.push(this.static.trim());
    }

    this.alertService.sweetalertConfirm('ต้องการเพิ่มรอบซ้อมหรือไม่').then((result) => {
      if (result.isConfirmed) {

        this.rmuttService.addEvent(events.map(e => { return { name: e } }) as any).subscribe({
          complete: () => {
            this.alertService.sweetalertTime('success', 'เพิ่มรอบซ้อมสำเร็จ').then(() => {
              window.location.reload();
            });
          },
          error: () => {
            this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด');
          }
        });

      }
    });


  }

}
