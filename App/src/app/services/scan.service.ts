import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  constructor(private http: HttpClient) { }

  getStd(tag: string) {

    return this.http.get<any>(`${environment.apiUrl}/api/admin/scan/rfid/${tag}`, {
      headers: {
        authorization: `Bearer MTIzNDU2`
      }
    });
  }
}
