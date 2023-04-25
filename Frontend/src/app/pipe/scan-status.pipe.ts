import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scanStatus'
})
export class ScanStatusPipe implements PipeTransform {

  transform(num: number): string {
    return ['ผ่านครบทุกจุด', 'ผ่านไม่ครบทุกจุด', '-'][num] || '-';
  }

}
