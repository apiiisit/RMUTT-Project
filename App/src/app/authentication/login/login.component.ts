import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string = '';
  remember: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  btnClick() {
    this.authenticationService.authorization(this.password).subscribe({
      complete: () => {
        Swal.fire({
          icon: 'success',
          title: 'Authorization success',
        })
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Authorization error',
        })
      }
    });
  }

}
