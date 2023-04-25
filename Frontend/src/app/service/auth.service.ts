import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Login, User } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKENNAME = 'token';

  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user?: User;

  get token() {
    return sessionStorage.getItem(this.TOKENNAME);
  }

  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token);
    this.user = this.getUser(this.token!);
  }

  login(internetAccount: string, password: string) {
    const formLogin = { username: internetAccount, password: password };
    return this.http.post<Login>('api/login', formLogin).pipe(
      tap((res) => {
        this._isLoggedIn$.next(true);
        sessionStorage.setItem(this.TOKENNAME, res.token);
        this.user = this.getUser(res.token);
      })
    );
  }

  loginAdmin(masterPassword: string) {
    const encodeMasterPassword = btoa(masterPassword);
    return this.http.get<Login>('api/admin', {
      headers: { authorization: 'Bearer ' + encodeMasterPassword }
    }).pipe(
      tap(() => {
        this._isLoggedIn$.next(true);
        sessionStorage.setItem(this.TOKENNAME, encodeMasterPassword);
        this.user = this.getUser(encodeMasterPassword);
      })
    );
  }

  logout() {
    this._isLoggedIn$.next(false);
    sessionStorage.clear();
  }

  private getUser(token: string) {
    if (!token) return;

    let user = token.split('.').length === 3
      ? { token: token, role: 'user' }
      : { token: token, role: 'admin' }

    return user;
  }

}
