import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Observable, Subject, switchMap } from 'rxjs';
import { Std, Stds } from 'src/app/interface/std';
import { AlertService } from 'src/app/service/alert.service';
import { ElectronService } from 'src/app/service/electron.service';
import { ImageService } from 'src/app/service/image.service';
import { MockService } from 'src/app/service/mock.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-manage-rfid',
  templateUrl: './manage-rfid.component.html',
  styleUrls: ['./manage-rfid.component.scss']
})
export class ManageRfidComponent {

  fetch!: Observable<Std>;

  stdList: Stds[] = [];
  stdListTemp: Stds[] = [];
  indexStd!: number;
  totalRecords!: number;
  deviceStatus!: boolean;

  // search tool
  checkedRFID: boolean = true;
  cols: any[] = [];
  selectedColumns: any[] = [];
  searchText!: string;
  onSearchStd = new Subject<string>();
  showSearchNotFound: boolean = false;

  constructor(
    private rmuttService: RmuttService,
    private electronService: ElectronService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private _ngZone: NgZone,
    private mockService: MockService,
    public imageService: ImageService
  ) { }

  ngOnInit(): void {

    if (!this.electronService.isElectron) {
      this.router.navigate(['admin', 'notapp']);
      this.alertService.sweetalert('warning', 'กรุณาเปิดหน้านี้ผ่าน Application');
    } else {

      this.cols = this.mockService.facultys.map(x => { return { name: x } });

      let id = this.route.snapshot.paramMap.get('id');
      if (id) this.checkedRFID = false;
      this.fetch = id ? this.rmuttService.getStdById(id) : this.rmuttService.getStdAll();

      this.fetch.subscribe((res) => {
        this.stdListTemp = res.data;
        this.stdList = res.data.filter((std) => this.checkedRFID ? !std.tag : std);
        this.updataPaginator();
      });

      this.electronService.ipc.send('status');
      this.electronService.ipc.on('status', (event, data) => {
        this._ngZone.run(() => this.deviceStatus = data);
      });

      this.electronService.ipc.on('rfidTag', (event, data) => {
        this._ngZone.run(() => this.addRfidToStd(data));
      });

    }

    this.onSearchStd.pipe(
      debounceTime(400),
      switchMap(() => { return this.fetch })
    ).subscribe((res) => {
      this.resetSearchTool();
      this.stdListTemp = res.data.filter((std) => std.name.includes(this.searchText) || std.id.includes(this.searchText));
      this.stdList = this.stdListTemp;
      this.showSearchNotFound = this.stdListTemp.length === 0;
      this.updataPaginator();
    });

  }

  onPageChange(event: any) {
    this.indexStd = event.first;
  }

  searchInput() {
    this.onSearchStd.next(this.searchText);
  }

  searchMultiSelect() {
    this.stdList = this.stdListTemp
      .filter((std) => this.checkedRFID ? !std.tag : std)
      .filter(std => this.selectedColumns.length > 0 ? this.selectedColumns.map(x => x.name).includes(std.faculty) : std);
    this.updataPaginator();
  }

  reset() {
    this.resetSearchTool();
    this.searchText = '';

    this.fetch.subscribe((res) => {
      this.stdListTemp = res.data;
      this.stdList = res.data.filter((std) => this.checkedRFID ? !std.tag : std);
      this.updataPaginator();
    });

  }

  resetSearchTool() {
    this.showSearchNotFound = false;
    this.checkedRFID = false;
    this.selectedColumns = [];
  }

  updataPaginator() {
    this.indexStd = 0;
    this.totalRecords = this.stdList.length;
  }

  addRfidToStd(tag: string) {
    this.rmuttService.addRFiD(this.stdList[this.indexStd].id, tag).subscribe({
      complete: () => {
        this.stdList[this.indexStd].tag = tag;
        this.alertService.sweetalertTime('success', 'บันทึก RFiD Tag เรียบร้อยแล้ว').then(() => {
          this.checkEnd();
        });
      },
      error: (error) => {
        let msg = error.error.error;
        if (error.error.data) {
          msg += 'โดย\n' + error.error.data[0].id + '\n' + error.error.data[0].name;
        }
        this.alertService.sweetalert('warning', msg);
      }
    });
  }

  deleteTag() {
    let data = this.stdList[this.indexStd];
    data.tag = null as any;
    const { id, tag } = data;

    this.rmuttService.editStd({ id, tag } as Stds).subscribe({
      complete: () => {
        this.alertService.sweetalertTime('success', 'ลบ RFiD Tag เรียบร้อยแล้ว').then(() => {
          this.checkEnd();
        });
      }, error: () => {
        this.alertService.sweetalert('warning', 'ลบ RFiD Tag ไม่สำเร็จ');
      }
    });
  }

  checkEnd() {

    if (this.indexStd + 1 === this.totalRecords) {
      this.alertService.sweetalert('info', 'ไม่มีข้อมูลบัณฑิตให้จัดการแล้ว').then(() => {
        return this.ngOnInit();
      });
    } else this.indexStd += 1;

  }

}
