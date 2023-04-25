import { Component } from '@angular/core';
import { Dashboards } from 'src/app/interface/dashboard';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  dash!: Dashboards;

  constructor(private rmuttService: RmuttService) { }

  ngOnInit(): void {
    this.dash = {} as any;
    this.rmuttService.getDashboard().subscribe({
      next: (res) => {
        this.dash = res.data
      }
    });
  }

}
