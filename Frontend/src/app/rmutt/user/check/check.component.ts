import { Component } from '@angular/core';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent {

  events!: any;

  constructor(private rmuttService: RmuttService) { }

  ngOnInit(): void {

    this.rmuttService.getHistoryEventCheck().subscribe({
      next: (res) => {
        this.events = res.data;
      }
    });

  }

}
