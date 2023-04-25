import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  icon!: string;

  constructor() {
    this.icon = 'bars';
  }

  menuToggle() {
    let toggle: boolean = this.icon === 'bars';
    this.icon = this.icon === 'bars' ? 'times' : 'bars';
    document.getElementById('menu')!.style.display = toggle ? 'block' : 'none';
  }

  onClickMenu() {
    if (document.getElementById('menu')!.style.display === 'block') {
      this.icon = 'bars';
      document.getElementById('menu')!.style.display = 'none';
    }
  }

}
