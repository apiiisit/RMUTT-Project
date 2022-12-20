import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StdService {

  private readonly api = environment.apiUrl;
  private readonly header = { authorization: `Bearer MTIzNDU2` };

  constructor(private http: HttpClient) { }

  scanRFiD(tag: string) {
    return this.http.get<any>(`${this.api}/admin/scan/rfid/${tag}`, {
      headers: this.header
    })
  }

  getStd() {
    return this.http.get<any>(`${this.api}/admin/students`, {
      headers: this.header
    })
  }
}
