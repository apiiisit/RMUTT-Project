import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { StdService } from '../../services/std.service';
import * as XLSX from 'xlsx';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-manage-std',
  templateUrl: './manage-std.component.html',
  styleUrls: ['./manage-std.component.scss']
})
export class ManageStdComponent {

  stdList!: any[];
  selectedStd!: any[];
  
  readStd!: string[];
  readStdDialog!: boolean;
  
  constructor(
    private stdService: StdService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.stdService.getStd().subscribe(res => {

      if (res.error) {

      } else {
        this.stdList = res.data;
      }
    })

  }

  searchStd(dt: Table, event: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  readFile(event: any) {
    
    const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();

    reader.onload = (event: any) => {
      const bstr: string = event.target.result;
      const workBook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const workSheetName: string = workBook.SheetNames[0];
      const workSheet: XLSX.WorkSheet = workBook.Sheets[workSheetName];

      // [
      //   ['รหัสนักศึกษา'], ['ชื่อ-นามสกุล'],
      //   ['116210905041-6'], ['อภิสิทธิ์ น้อยหลวงชัย']
      // ]
      // this.readStd = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

      // [
      //   {'รหัสนักศึกษา': '116210905041-6', 'ชื่อ-นามสกุล': 'อภิสิทธิ์ น้อยหลวงชัย'}
      // ]
      this.readStd = XLSX.utils.sheet_to_json(workSheet);
      
    }
    reader.readAsBinaryString(target.files[0]);
    this.readStdDialog = true;
  }

  importFile() {
    this.alertService.sweetalertProgress('กำลัง import...');
    const std = [...this.readStd].map((x: any) => [x['รหัสนักศึกษา'].toString(), x['ชื่อ-นามสกุล']]);
    this.stdService.addStd(std).subscribe((res: any) => {
      if (res.error) {
        this.alertService.sweetalert('error', 'Import ข้อมูลบัณฑิตไม่สำเร็จ', 3000);
      } else {
        this.alertService.sweetalert('success', 'Import ข้อมูลบัณฑิตสำเร็จ', 2000).then(() => {
          this.readStdDialog = false;
          this.ngOnInit();
        })
      }
    })
  }

}
