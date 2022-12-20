import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

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
    private authService: AuthService
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
        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          showConfirmButton: false,
          timer: 1500
        }).then(() => this.msg = res.error);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['admin'])
        })
      }

    })
  }

}
