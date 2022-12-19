import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StdService {

  private readonly header = { authorization: `Bearer MTIzNDU2` };

  constructor(private http: HttpClient) { }

  scanRFiD(tag: string) {
    return this.http.get<any>(`${environment.apiUrl}/admin/scan/rfid/${tag}`, {
      headers: this.header
    })
  }

  getStd() {
    return this.http.get<any>(`${environment.apiUrl}/admin/students`, {
      headers: this.header
    })
  }
}
