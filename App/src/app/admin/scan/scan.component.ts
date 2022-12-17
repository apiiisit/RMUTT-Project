import { Component, NgZone, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ScanService } from '../../services/scan.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

  ipcRenderer!: IpcRenderer;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  std!: any;

  constructor(
    private _ngZone: NgZone,
    private scanService: ScanService
  ) { }


  ngOnInit(): void {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcRenderer.on('RFiDTag', (event, data) => {
        this._ngZone.run(() => {
          this.scanService.getStd(data).subscribe(res => {
            if (res.error) {

            } else {
              this.std = res.data[0];
            }
          })
        });
      });
    }

  }

}
