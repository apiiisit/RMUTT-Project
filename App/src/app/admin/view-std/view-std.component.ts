import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { StdService } from '../../services/std.service';

@Component({
  selector: 'app-view-std',
  templateUrl: './view-std.component.html',
  styleUrls: ['./view-std.component.scss']
})
export class ViewStdComponent implements OnInit {

  stdList!: any[];

  constructor(private stdService: StdService) { }

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
