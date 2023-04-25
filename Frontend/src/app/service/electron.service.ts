import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  private ipcRenderer!: IpcRenderer;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  get ipc() {
    return this.ipcRenderer;
  }

  constructor(private router: Router) {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.ipcRenderer?.eventNames().forEach((channel: any) => {
          this.ipcRenderer.removeAllListeners(channel);
        });
      }
    });

  }

}
