import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { StdService } from '../../services/std.service';

@Component({
  selector: 'app-manage-std',
  templateUrl: './manage-std.component.html',
  styleUrls: ['./manage-std.component.scss']
})
export class ManageStdComponent {

  stdList!: any[];
  selectedStd!: any[];

  constructor(
    private stdService: StdService
  ) { }

  ngOnInit(): void {
    this.stdService.getStd().subscribe(res => {

      if (res.error) {

      } else {
        this.stdList = res.data;
      }
    })

  }

  searchStd(dt: Table, event: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }
  
}
