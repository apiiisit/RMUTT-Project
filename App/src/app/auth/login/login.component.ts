import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username!: string;
  password!: string;
  msg!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    // default
    this.username = '1162109050416';
    this.password = 'aT@922544'
  }

  btnLogin() {
    this.msg = '';
    const form = {
      username: this.username,
      password: this.password
    }
    this.authService.login(form).subscribe((res: any) => {
      if (res.error) {
        this.alertService.sweetalert('error', 'เข้าสู่ระบบไม่สำเร็จ').then(() => this.msg = res.error);
      } else {
        this.alertService.sweetalert('success', 'เข้าสู่ระบบสำเร็จ').then(() => this.router.navigate(['admin']));
      }

    })
  }

}
