import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { lastValueFrom } from 'rxjs';
import { ImageService } from 'src/app/service/image.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-view-std-doc',
  templateUrl: './view-std-doc.component.html',
  styleUrls: ['./view-std-doc.component.scss']
})
export class ViewStdDocComponent {

  docId!: number;
  docName!: string;

  stdList: any[] = [];
  arrMsgComment: string[] = [];

  events!: any[];
  dialogHistory!: boolean;

  constructor(
    private rmuttService: RmuttService,
    public imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.docId = this.route.snapshot.params['docid'];
    this.docName = history.state?.docName;

    this.arrMsgComment = [
      'ยังไม่ได้อัปโหลดเอกสาร',
      'รอการตรวจสอบ',
      'ผ่าน',
      'ไม่ผ่าน'
    ];

    this.rmuttService.getStdInDoc(this.docId).subscribe({
      next: (res) => {

        for (let data of res.data) {
          data.msgComment = this.msgStatus(data.files[0]);
          data.colorStatus = this.colorStatus(data.msgComment);
        }

        this.stdList = res.data;
        
      }
    });

  }

  searchStd(dt: Table, event: any) {
    return dt.filterGlobal(event.target.value, 'contains');
  }

  msgStatus(file: any) {

    if (!file) return this.arrMsgComment[0];
    if (!file.verify && !file.failreason) return this.arrMsgComment[1];
    if (file.verify) return this.arrMsgComment[2];
    if (!file.verify && !!file.failreason) return this.arrMsgComment[3] + (file.failreason?.trim()?.length > 0 ? ` เพราะ${file.failreason}` : '');
    return;
  }

  colorStatus(msg: string) {
    return ['red', 'yellow', 'green', 'red'].at(this.arrMsgComment.indexOf(msg));
  }

}
