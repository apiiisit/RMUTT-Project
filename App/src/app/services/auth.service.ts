import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(formLogin: object) {
    return this.http.post(`${this.api}/login`, formLogin);
  }
}
