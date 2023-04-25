import { Component, Input } from '@angular/core';
import { Stds } from 'src/app/interface/std';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-import-std-dialog',
  templateUrl: './import-std-dialog.component.html',
  styleUrls: ['./import-std-dialog.component.scss']
})
export class ImportStdDialogComponent {

  @Input() readStd: string[] = [];

  constructor(
    private rmuttService: RmuttService,
    private alertService: AlertService,
    public dialogService: DialogService
  ) { }

  importFile() {
    this.alertService.sweetalertProgress('กำลัง import...');
    const std = this.readStd.map((x: any) => {
      return {
        row: +x['ลำดับรอบ'],
        rowfaculty: +x['ลำดับในคณะ'],
        degree: x['ชั้นปริญญา'],
        ...(x['อันดับเกียรตินิยม'] ? { honor: +x['อันดับเกียรตินิยม'] } : {}),
        id: x['รหัสนักศึกษา'],
        prefixname: x['คำนำหน้า'],
        name: x['ชื่อ-สกุล'],
        ...(x['เหรียญ'] ? { award: x['เหรียญ'] } : {}),
        faculty: x['สาขา'],
        year: x['ปี'] + '/' + x['ภาค']
      } as Stds
    });

    this.rmuttService.addStd(std).subscribe({
      complete: () => {
        this.alertService.sweetalertTime('success', 'Import ข้อมูลบัณฑิตสำเร็จ', 2000).then(() => {
          this.dialogService.importDialog = false;
          window.location.reload();
        });
      },
      error: () => {
        this.alertService.sweetalert('error', 'Import ข้อมูลบัณฑิตไม่สำเร็จ');
      }
    });
  }

}
