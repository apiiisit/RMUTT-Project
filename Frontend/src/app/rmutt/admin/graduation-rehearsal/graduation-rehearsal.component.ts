import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, TreeNode } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-graduation-rehearsal',
  templateUrl: './graduation-rehearsal.component.html',
  styleUrls: ['./graduation-rehearsal.component.scss']
})
export class GraduationRehearsalComponent {

  eventId!: string;
  eventName!: string;

  title!: string;
  subtitle!: string;
  menuItem: MenuItem[] = [];

  pointMenu: TreeNode[] = [];

  constructor(
    private rmuttService: RmuttService,
    private dialogService: DialogService,
    private FormService: FormService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {

    this.eventId = this.route.snapshot.params['eventid'];
    this.eventName = history.state?.eventName;

    const resAllPoint = await lastValueFrom(this.rmuttService.getAllPointByEventId(this.eventId));

    if (resAllPoint.data.events.points.length == 0) {
      await lastValueFrom(this.rmuttService.addPoint([{ name: 'จุด 1', eventid: +this.eventId }]));
    }

    this.pointMenu.push(
      {
        label: 'ดูประวัติทั้งหมด',
        icon: 'pi pi-folder'
      }
    );

    this.menuItem = [
      {
        label: 'รอบซ้อมรับปริญญา',
        items: [
          {
            label: 'แก้ไขชื่อรอบ',
            icon: 'pi pi-pencil',
            command: () => this.editEvent(this.eventId, this.eventName)
          },
          {
            label: 'ลบรอบซ้อม',
            icon: 'pi pi-trash',
            command: () => this.deleteEvent(this.eventId, this.eventName)
          }
        ]
      },
      {
        label: 'จุดสแกน',
        items: [
          {
            label: 'เพิ่มจุดสแกน',
            icon: 'pi pi-plus',
            command: () => this.dialogService.pointDialog = true
          }
        ]
      }
    ];

    this.rmuttService.getAllPointByEventId(this.eventId).subscribe({
      next: (res) => {
        for (let data of res.data.events.points) {
          this.pointMenu.push(
            {
              label: data.name,
              data: data.pointid,
              expandedIcon: "pi pi-folder-open",
              collapsedIcon: "pi pi-folder",
              children: [
                {
                  label: 'สแกน',
                  icon: 'pi pi-calendar'
                },
                {
                  label: 'ดูประวัติ',
                  icon: 'pi pi-history'
                },
                {
                  label: 'แก้ไขชื่อจุด',
                  icon: 'pi pi-pencil'
                },
                {
                  label: 'ลบจุดสแกน',
                  icon: 'pi pi-trash'
                }
              ]
            }
          );
        }

      }
    });

  }

  nodeSelect(event: any) {
    const pointid = event.node.parent?.data;
    const name = event.node.parent?.label;
    const menuName = event.node.label;

    if (!pointid && menuName === 'ดูประวัติทั้งหมด') return this.router.navigate(['admin', 'graduation-rehearsal', 'history-event', this.eventId], { state: { eventName: this.eventName } }).then(() => window.location.reload());

    if (menuName === 'สแกน') return this.router.navigate(['admin', 'graduation-rehearsal', 'scan-point', pointid], { state: { eventId: this.eventId, eventName: this.eventName, pointName: name } }).then(() => window.location.reload());
    if (menuName === 'ดูประวัติ') return this.router.navigate(['admin', 'graduation-rehearsal', 'history-point', pointid], { state: { eventId: this.eventId, eventName: this.eventName, pointName: name } }).then(() => window.location.reload());
    if (menuName === 'แก้ไขชื่อจุด') return this.editPoint(+pointid, name);
    if (menuName === 'ลบจุดสแกน') return this.deletePoint(+pointid, name);

  }

  editEvent(id: string, name: string) {
    this.FormService.eventEditForm.setValue({
      eventid: id,
      name
    });
    this.dialogService.eventEditDialog = true;
  }

  editPoint(pointid: number, name: string) {
    this.FormService.pointForm.setValue({ pointid, name });
    this.dialogService.pointEditDialog = true;
  }

  deleteEvent(id: string, name: string) {
    this.alertService.sweetalertConfirm('ลบรอบซ้อมรับปริญญา', `ต้องการลบ "${name}" หรือไม่?`).then((result) => {
      if (result.isConfirmed) {
        this.rmuttService.deleteEvent(id).subscribe({
          complete: () => {
            this.alertService.sweetalertTime('success', `ลบ ${name} สำเร็จ`).then(() => {
              this.router.navigate(['admin']).then(() => window.location.reload());
            });
          },
          error: () => {
            this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด');
          }
        });
      }
    });
  }

  deletePoint(pointid: number, name: string) {
    this.alertService.sweetalertConfirm('ลบจุดสแกน', `ต้องการลบ "${name}" หรือไม่?`).then((result) => {
      if (result.isConfirmed) {
        this.rmuttService.delPoint(pointid).subscribe({
          complete: () => {
            this.alertService.sweetalertTime('success', `ลบ ${name} สำเร็จ`).then(() => {
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
