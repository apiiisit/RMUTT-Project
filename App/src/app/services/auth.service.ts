import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(formLogin: object) {
    return this.http.post(`${environment.apiUrl}/api/login`, formLogin);
  }

}
