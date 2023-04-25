import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { lastValueFrom } from 'rxjs';
import { ImageService } from 'src/app/service/image.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-view-std',
  templateUrl: './view-std.component.html',
  styleUrls: ['./view-std.component.scss']
})
export class ViewStdComponent {

  stdList: any[] = [];
  arrMsgComment: string[] = [];

  history!: any[];
  dialogHistory!: boolean;

  stdDoc!: any;
  dialogDoc!: boolean;

  constructor(
    private rmuttService: RmuttService,
    public imageService: ImageService
  ) { }

  async ngOnInit(): Promise<void> {

    this.arrMsgComment = [
      'ยังไม่ได้อัปโหลดเอกสาร',
      'รอการตรวจสอบ',
      'ผ่าน',
      'ไม่ผ่าน'
    ];

    const stdRes = await lastValueFrom(this.rmuttService.getStdAll());
    // const eventCheckRes = await lastValueFrom(this.rmuttService.getEventCheck());

    // stdRes.data.forEach((std: any) => {
    //   std.passed = eventCheckRes.data.find(eventCheck => eventCheck.id === std.id)?.passed;

    //   std.msgComment = this.msgStatus(std);
    //   std.colorStatus = this.colorStatus(std.msgComment);

    // });

    this.stdList = stdRes.data;

  }

  searchStd(dt: Table, event: any) {
    return dt.filterGlobal(event.target.value, 'contains');
  }

  msgStatus(file: any) {

    const key = Object.keys(file)

    if (!key.includes('verify') && !key.includes('failreason')) return this.arrMsgComment[0];

    if (!file) return this.arrMsgComment[0];
    if (!file.verify && !file.failreason) return this.arrMsgComment[1];
    if (file.verify) return this.arrMsgComment[2];
    if (!file.verify && !!file.failreason) return this.arrMsgComment[3] + (file.failreason?.trim()?.length > 0 ? ` เพราะ${file.failreason}` : '');
    return;
  }

  colorStatus(msg: string) {
    return ['red', 'yellow', 'green', 'red'].at(this.arrMsgComment.indexOf(msg));
  }

  async viewHistory(stdId: string) {
    const res = await lastValueFrom(this.rmuttService.getHistoryEventCheckById(stdId));

    this.history = res.data;
    this.dialogHistory = true;

  }

  async viewDoc(stdId: string) {
    const res = await lastValueFrom(this.rmuttService.getCheckuploadById(stdId));

    const documents = res.data.documents;
    const students = res.data.students;

    for (let document of documents) {
      const fIndex = students.files.findIndex((f: any) => f.documentsId == document.id);
      if (fIndex != -1) {
        students.files[fIndex].name = document.name;
      } else {
        students.files.push({ ...document });
      }
    }

    for (let file of students.files) {

      file.msgComment = this.msgStatus(file);
      file.colorStatus = this.colorStatus(file.msgComment);

    }

    this.stdDoc = students;

    this.dialogDoc = true;

  }

}
