import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RmuttService {

  constructor(private http: HttpClient) { }

  authorization(password: string) {
    return this.http.get<any>(environment.API_URL, {
      headers: {
        Authorization: `Bearer ${password}`
      }
    });
  }
}
