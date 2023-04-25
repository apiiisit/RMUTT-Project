import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { DialogService } from 'src/app/service/dialog.service';
import { MenuService } from 'src/app/service/menu.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  event$!: Subscription;
  url!: string;
  role!: string;
  items!: MenuItem[];

  constructor(
    public menuService: MenuService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private rmuttService: RmuttService
  ) { }

  ngOnInit(): void {

    this.role = this.authService.user!.role;

    this.event$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
      }
    })

    if (!this.url) this.url = this.router.url;

    this.items = [
      {
        label: 'รอบซ้อมรับปริญญา',
        items: [
          {
            label: 'เพิ่มรอบซ้อม',
            icon: 'pi pi-plus',
            command: () => {
              this.dialogService.eventDialog = true;
            }
          }
        ]
      }
    ];

    if (this.role === 'admin') {
      this.rmuttService.getEventName().subscribe({
        next: (res) => {
          for (let data of res.data) {
            this.items[0].items?.push({
              label: data.name,
              icon: 'pi pi-folder',
              command: () => {
                this.menuService.onClickMenu();
                this.router.navigate(['admin', 'graduation-rehearsal', data.eventid], { state: { eventName: data.name } }).then(() => {
                  window.location.reload();
                });
              }
            });
          }
        }
      });
    }

  }

  ngOnDestroy(): void {
    this.event$.unsubscribe();
  }

  activeMenu(menu: string) {
    const path = this.url.split('/');
    
    if (path.length > 2) return path.filter(p => p != 'admin' && p != 'user').includes(menu) ? 'bg-blue-100 font-bold' : '';
    return path.at(-1) === menu ? 'bg-blue-100 font-bold' : '';
    
  }

  logout() {
    this.alertService.sweetalertConfirm('คุณต้องการออกจากระบบหรือไม่?').then((result) => {
      if (result.isConfirmed) {
        this.alertService.sweetalertTime('success', 'ออกจากระบบสำเร็จ').then(() => {
          this.authService.logout();
          this.router.navigate(['auth']);
        });
      }
    });
  }

}
