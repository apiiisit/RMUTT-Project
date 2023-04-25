import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  masterPassword!: string;
  msg!: string;
  submited: boolean = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const role = this.authService.user?.role;
        this.router.navigate([role === 'admin' ? 'admin' : 'user']);
      }
    });
  }

  submit() {
    this.submited = true;
    if (!this.masterPassword) return;

    this.msg = '';

    this.authService.loginAdmin(this.masterPassword).subscribe({
      complete: () => {
        this.alertService.sweetalertTime('success', 'เข้าสู่ระบบสำเร็จ').then(() => this.router.navigate(['admin']));
      },
      error: (error) => {
        this.alertService.sweetalertTime('error', 'เข้าสู่ระบบไม่สำเร็จ').then(() => this.msg = error.error.error);
      }
    });
  }

}
