import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  coolDown!: number;
  interval$!: Subscription;

  constructor(private router: Router) {
    this.coolDown = 5;
  }

  ngOnInit(): void {
    this.interval$ = interval(1000)
      .subscribe(() => {
        if (this.coolDown <= 0) this.router.navigate(['auth']);
        this.coolDown--;
      })
  }

  ngOnDestroy(): void {
    this.interval$.unsubscribe();
  }
  
}
