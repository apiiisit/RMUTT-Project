import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Stds } from 'src/app/interface/std';
import { AlertService } from 'src/app/service/alert.service';
import { ElectronService } from 'src/app/service/electron.service';
import { ImageService } from 'src/app/service/image.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-scan-point',
  templateUrl: './scan-point.component.html',
  styleUrls: ['./scan-point.component.scss']
})
export class ScanPointComponent {

  pointid!: number;
  eventId!: number;
  eventName!: string;
  pointName!: string;

  title!: string;
  subtitle!: string;
  std!: Stds;
  deviceStatus!: boolean;

  logScan: any[] = [];

  constructor(
    private rmuttService: RmuttService,
    private electronService: ElectronService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private _ngZone: NgZone,
    public imageService: ImageService
  ) { }

  ngOnInit(): void {

    this.std = {} as any;

    if (!this.electronService.isElectron) {
      this.router.navigate(['admin', 'notapp']);
      this.alertService.sweetalert('warning', 'กรุณาเปิดหน้านี้ผ่าน Application');
    } else {

      this.pointid = this.route.snapshot.params['pointid'];
      this.eventId = history.state?.eventId;
      this.eventName = history.state?.eventName;
      this.pointName = history.state?.pointName;
      

      this.rmuttService.settings().subscribe({
        next: (res) => {
          this.title = res.data.title
          this.subtitle = res.data.subtitle;
        }
      });

      this.electronService.ipc.send('status');
      this.electronService.ipc.on('status', (event, data) => {
        this._ngZone.run(() => this.deviceStatus = data);
      });

      this.electronService.ipc.on('rfidTag', (event, data) => {
        this._ngZone.run(() => this.scanRFiD(data));
      });

    }

  }

  scanRFiD(tag: string) {
    this.rmuttService.pointScan(tag, +this.pointid).subscribe({
      next: (res) => {
        this.std = res.data[0];
        this.addLog('', res.data[0]);
      },
      error: (error) => {
        this.alertService.sweetalertTime('error', error.error.error);
        if (error.error.errlvl != 2) this.addLog('bg-red-500 text-white', error.error.data[0]);
      }
    });
  }

  addLog(style: string, data: any) {

    this.logScan.unshift({ style, ...data });

    if (this.logScan.length > 3) this.logScan.pop();

  }

}
