import { Component, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { Stds } from 'src/app/interface/std';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { ImageService } from 'src/app/service/image.service';
import { RmuttService } from 'src/app/service/rmutt.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-std',
  templateUrl: './manage-std.component.html',
  styleUrls: ['./manage-std.component.scss']
})
export class ManageStdComponent {

  stdList: Stds[] = [];
  selectedStd: Stds[] = [];

  readStd: string[] = [];

  cols!: Object[];
  _selectedColumns!: Object[];

  constructor(
    private rmuttService: RmuttService,
    private dialogService: DialogService,
    private formService: FormService,
    private alertService: AlertService,
    public imageService: ImageService
  ) { }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }

  ngOnInit(): void {
    this.rmuttService.getStdAll().subscribe({
      next: (res) => {
        this.stdList = res.data;
      }
    });

    this.cols = [
      { field: 'photo', header: 'รูปภาพ' },
      // { field: 'atk', header: 'ผลตรวจ' },
      { field: 'tag', header: 'สถานะบัตร' }
    ];

    this._selectedColumns = this.cols;

  }

  openStdDialog() {
    this.formService.mode = 'new';
    this.formService.stdForm.reset();
    this.dialogService.stdDialog = true;
  }

  editStd(std: Stds) {
    this.formService.mode = 'edit';

    this.formService.stdForm.setValue({
      row: std.row,
      rowfaculty: std.rowfaculty,
      degree: std.degree,
      honor: std.honor,
      id: std.id,
      prefixname: std.prefixname,
      name: std.name,
      award: std.award,
      faculty: std.faculty,
      year: std.year,
    });
    this.formService.stdForm.get('id')?.disable();
    this.dialogService.stdDialog = true;
  }

  deleteStd(std: Stds) {
    this.alertService.sweetalertConfirm('ลบบัณฑิต', `ต้องการลบ "${std.name}" หรือไม่?`).then((result) => {
      if (result.isConfirmed) {
        this.rmuttService.deleteStd([{ id: std.id }]).subscribe({
          complete: () => {
            this.alertService.sweetalertTime('success', `ลบ ${std.name} สำเร็จ`).then(() => {
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

  deleteStds() {
    this.alertService.sweetalertConfirm('ลบบัณฑิต', 'ต้องการลบบัณฑิตที่เลือกหรือไม่?').then((result) => {
      if (result.isConfirmed) {
        const id = this.selectedStd.map(x => { return { id: x.id } });
        this.rmuttService.deleteStd(id).subscribe({
          complete: () => {
            this.alertService.sweetalertTime('success', 'ลบบัณฑิตที่เลือกสำเร็จ').then(() => {
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

  searchStd(dt: Table, event: any) {
    return dt.filterGlobal(event.target.value, 'contains');
  }

  readFile(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'].includes(target.files[0].type)) {
      this.alertService.sweetalert('warning', 'Import ไฟล์ผิดประเภท');
      return
    }
    
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    
    reader.onload = (event: any) => {
      const bstr: string = event.target.result;
      const workBook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const workSheetName: string = workBook.SheetNames[0];
      const workSheet: XLSX.WorkSheet = workBook.Sheets[workSheetName];

      // [
      //   ['รหัสนักศึกษา', 'ชื่อ-นามสกุล'],
      //   ['116210905041-6', 'อภิสิทธิ์ น้อยหลวงชัย']
      // ]
      // this.readStd = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

      // [
      //   {'รหัสนักศึกษา': '116210905041-6', 'ชื่อ-นามสกุล': 'อภิสิทธิ์ น้อยหลวงชัย'}
      // ]
      this.readStd = XLSX.utils.sheet_to_json(workSheet);
      this.dialogService.importDialog = true;
    }
  }

}
