import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Stds } from 'src/app/interface/std';
import { AlertService } from 'src/app/service/alert.service';
import { ElectronService } from 'src/app/service/electron.service';
import { ImageService } from 'src/app/service/image.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-scan',
  templateUrl: './check-rfid.component.html',
  styleUrls: ['./check-rfid.component.scss']
})
export class CheckRfidComponent {

  title!: string;
  subtitle!: string;
  std!: Stds;
  deviceStatus!: boolean;

  constructor(
    private rmuttService: RmuttService,
    private electronService: ElectronService,
    private router: Router,
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
    this.rmuttService.scanRFiD(tag).subscribe({
      next: (res) => {

        if (res.data.length === 0) {
          this.alertService.sweetalert('warning', 'ไม่พบข้อมูล');
        } else {
          this.std = res.data[0];
        }

      }
    });
  }

}
