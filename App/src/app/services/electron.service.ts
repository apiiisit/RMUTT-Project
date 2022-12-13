import { Injectable } from '@angular/core';
import { IpcRenderer, ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  ipcRenderer!: IpcRenderer;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcRenderer.send('start', 'start scan');
      this.ipcRenderer.on('tag', (event, data: string) => {
        console.log(data);
      })
    }
  }
}
