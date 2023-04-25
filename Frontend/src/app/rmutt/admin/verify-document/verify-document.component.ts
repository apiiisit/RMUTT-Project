import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { DocVerifys } from 'src/app/interface/docVerify';
import { PhotoVerifys } from 'src/app/interface/photoVerify';
import { AlertService } from 'src/app/service/alert.service';
import { ImageService } from 'src/app/service/image.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-verify-document',
  templateUrl: './verify-document.component.html',
  styleUrls: ['./verify-document.component.scss']
})
export class VerifyDocumentComponent {

  docName!: string;
  stdList: DocVerifys[] = [];
  photoList: PhotoVerifys[] = [];
  mode!: string;
  verifyService!: (data: any) => Observable<Object>;

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService,
    public imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const docid = this.route.snapshot.params['docid'] as number;
    this.docName = history.state?.docName;
    this.mode = history.state?.mode;

    if (!docid && this.mode === 'photo') {
      this.verifyService = (data: any) => this.rmuttService.verifyPhoto(data);
      this.rmuttService.getPhotoList().subscribe({
        next: (res) => this.photoList = res.data
      });
    } else if (!docid && this.mode === 'allfile') {
      this.verifyService = (data: any) => this.rmuttService.verifyFile(data);
      this.rmuttService.getFileAllVerify().subscribe({
        next: (res) => this.stdList = res.data
      });
    } else if (!!docid && this.mode === 'file') {
      this.verifyService = (data: any) => this.rmuttService.verifyFile(data);
      this.rmuttService.getFileVerifyInDoc(docid).subscribe({
        next: (res) => this.stdList = res.data
      });
    }

  }

  pass(data: any) {
    this.verify({ id: data.id, verify: true });
  }

  notPass(data: any) {
    this.alertService.sweetalertInput('เพราะเหตุใดถึงไม่ผ่าน?').then(res => {
      if (res.isConfirmed) {
        this.verify({ id: data.id, verify: false, failreason: res.value || ' ' });
      }
    });
  }

  verify(data: any) {

    this.alertService.sweetalertProgress('กำลังอัปโหลดไฟล์รูปภาพ...');

    this.verifyService(data).subscribe({
      complete: () => {
        this.alertService.sweetalertTime('success', 'บันทึกสำเร็จ', 700).then(() => {
          window.location.reload();
        });
      },
      error: () => {
        this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    });
  }

}
