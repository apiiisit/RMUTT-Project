import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  event$!: Subscription;
  url!: string;
  icon!: string;

  constructor(
    private router: Router
  ) {
    this.icon = 'bars'
  }

  ngOnInit(): void {
    this.event$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
      }
    })

    if (!this.url) this.url = this.router.url;

  }

  ngOnDestroy(): void {
    this.event$.unsubscribe();
  }

  activeMenu(menu: string) {
    const path = this.url.split('/').at(-1);
    return path === menu ? 'active' : '';
  }

  showMenu() {
    let toggle: boolean;
    toggle = this.icon === 'bars'
    this.icon = toggle ? 'times' : 'bars';

    const layout = document.getElementById('menu')
    layout!.style.display = toggle ? 'flex' : 'none';

  }

}
