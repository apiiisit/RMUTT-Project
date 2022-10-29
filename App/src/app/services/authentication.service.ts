import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RmuttService } from './rmutt.service';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _isAuthorization$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = environment.TOKEN_NAME;

  isAuthorization$ = this._isAuthorization$.asObservable();

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private rmuttService: RmuttService) {
    this._isAuthorization$.next(!!this.token);
  }

  authorization(password: string) {
    password = Buffer.from(password).toString('base64');
    
    return this.rmuttService.authorization(password).pipe(
      tap(res => {
        this._isAuthorization$.next(true);
        localStorage.setItem(this.TOKEN_NAME, password)
      })
    )
  }

}
