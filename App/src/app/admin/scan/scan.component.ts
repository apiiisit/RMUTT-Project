import { Component, NgZone, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';
import { StdService } from '../../services/std.service';

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
  found!: boolean;

  constructor(
    private _ngZone: NgZone,
    private stdService: StdService
  ) { }


  ngOnInit(): void {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcRenderer.on('RFiDTag', (event, data) => {
        this._ngZone.run(() => {
          this.stdService.scanRFiD(data).subscribe(res => {
            if (res.error) {

            } else {
              this.found = res.data.length === 0;
              this.std = res.data[0];
            }
          })
        });
      });
    }

  }

}
