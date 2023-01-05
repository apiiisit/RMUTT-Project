import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  sweetalert(icon: SweetAlertIcon, title: string, timer?: number) {
    return Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: timer || 1500
    });
  }

  sweetalertProgress(title: string) {
    return Swal.fire({
      title: title,
      didOpen: () => Swal.showLoading(null)
    });
  }

}
