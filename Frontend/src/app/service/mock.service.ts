import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  degrees: string[];
  prefixnames: string[];
  facultys: string[];
  awards: string[];

  constructor() {

    this.degrees = [
      'วิทยาศาสตรดุษฎีบัณฑิต', // เอก
      'วิทยาศาสตรมหาบัณฑิต', // โท
      'วิทยาศาสตรบัณฑิต' // ตรี
    ];
  
    this.prefixnames = [
      'นาย',
      'นาง',
      'นางสาว',
      'ว่าที่ร้อยตรี',
      'ว่าที่ร้อยตรีหญิง'
    ];

    this.facultys = [
      'คณิตศาสตร์',
      'เคมี',
      'เคมีประยุกต์',
      'ชีววิทยาประยุกต์',
      'เทคโนโลยีสารสนเทศ',
      'ฟิสิกส์ประยุกต์',
      'วิทยาการข้อมูลและสารสนเทศ',
      'วิทยาการคอมพิวเตอร์',
      'สถิติประยุกต์'
    ];

    this.awards = [
      'ทอง',
      'เงิน'
    ];

  }

}
