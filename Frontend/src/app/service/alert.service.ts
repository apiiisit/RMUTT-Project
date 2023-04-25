import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  sweetalert(icon: SweetAlertIcon, title: string, text?: string) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: true
    });
  }

  sweetalertTime(icon: SweetAlertIcon, title: string, timer?: number) {
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
      didOpen: () => Swal.showLoading(null!)
    });
  }

  sweetalertConfirm(title: string, text?: string) {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    });
    // .then(result => {
    //   if (result.isConfirmed) { }
    // })
  }

  sweetalertInput(title: string) {
    return Swal.fire({
      title: title,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
      showLoaderOnConfirm: true,
      preConfirm: msg => msg,
      allowOutsideClick: () => !Swal.isLoading()
    });
    // .then(result => {
    //   if (result.isConfirmed) { }
    // })
  }

}
