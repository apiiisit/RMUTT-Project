import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  internetAccount!: string;
  password!: string;
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
        this.router.navigate([role === 'user' ? 'user' : 'admin']);
      }
    });
  }

  submit() {
    this.submited = true;
    if (!this.internetAccount || !this.password) return;

    this.msg = '';
    
    this.authService.login(this.internetAccount, this.password).subscribe({
      complete: () => {
        this.alertService.sweetalertTime('success', 'เข้าสู่ระบบสำเร็จ').then(() => this.router.navigate(['user']));
      },
      error: (error) => {
        this.alertService.sweetalertTime('error', 'เข้าสู่ระบบไม่สำเร็จ').then(() => this.msg = error.error.error);
      }
    });
  }


}
