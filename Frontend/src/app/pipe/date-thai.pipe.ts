import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateThai'
})
export class DateThaiPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '-';
    return new Date(value).toLocaleString('th-TH');
  }

}
