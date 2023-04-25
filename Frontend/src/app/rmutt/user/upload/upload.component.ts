import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component } from '@angular/core';
import { Stds } from 'src/app/interface/std';
import { Task } from 'src/app/interface/upload';
import { AlertService } from 'src/app/service/alert.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  user: any = {};
  uploadTaskList: any[] = [];
  httpHeaders: any;
  photo: any;

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.rmuttService.getUploadTask().subscribe({
      next: (res) => {
        res.data.task.map(task => {
          if (task.files[0]) task.files[0].path = `api/image/${task.files[0].path}`;

          if (!task.files[0]) {
            task.files[0] = {
              msgStatus: 'กรุณาอัปโหลดไฟล์รูปภาพ',
              statusColor: 'red'
            }
          } else if (!task.files[0].failreason && !task.files[0].verify) {
            task.files[0].msgStatus = 'รอการตรวจสอบ';
            task.files[0].statusColor = 'yellow';
          } else if (!task.files[0].failreason && task.files[0].verify) {
            task.files[0].msgStatus = 'ผ่านการตรวจสอบ';
            task.files[0].statusColor = 'green';
          } else if (task.files[0].failreason && !task.files[0].verify) {
            task.files[0].msgStatus = 'ไม่ผ่านการตรวจสอบ' + (task.files[0].failreason?.trim()?.length > 0 ? ` เพราะ${task.files[0].failreason}` : '')
            task.files[0].statusColor = 'red';
          }

        })

        this.uploadTaskList = res.data.task;

      }
    });

    this.httpHeaders = this.rmuttService.header;
    this.rmuttService.getDetail().subscribe({
      next: (res) => {

        if (res.data[0].photo) {
          this.photo = `api/image/${res.data[0].photo}`;
        }
        this.user = res.data[0];

        if (!res.data[0].photo && !res.data[0].failreason && !res.data[0].verify) {
          this.user.msgStatus = 'กรุณาอัปโหลดรูปภาพ';
          this.user.statusColor = 'red';
        } else if (res.data[0].photo && !res.data[0].failreason && !res.data[0].verify) {
          this.user.msgStatus = 'รอการตรวจสอบ';
          this.user.statusColor = 'yellow';
        } else if (!res.data[0].failreason && res.data[0].verify) {
          this.user.msgStatus = 'ผ่านการตรวจสอบ';
          this.user.statusColor = 'green';
        } else if (res.data[0].failreason && !res.data[0].verify) {
          this.user.msgStatus = 'ไม่ผ่านการตรวจสอบ' + (res.data[0].failreason?.trim()?.length > 0 ? ` เพราะ${res.data[0].failreason}` : '');
          this.user.statusColor = 'red';
        }

      }
    });
  }

  onSelect(event: any, name: string, task?: Task) {
    let reader = new FileReader();
    reader.readAsDataURL(event.currentFiles[0])
    reader.onload = (event) => {
      if (name === 'photo') {
        this.photo = event.target?.result;
        this.user.msgStatus = '';
      }
      else task!.files[0] = { path: event.target?.result };
    };
  }

  onUpload() {
    this.alertService.sweetalertTime('success', 'อัปโหลดสำเร็จ').then(() => {
      window.location.reload();
    });
  }

  onError() {
    this.alertService.sweetalertTime('error', 'อัปโหลดไม่สำเร็จ');
  }

}
