import { Component } from '@angular/core';
import { Stds } from 'src/app/interface/std';
import { ImageService } from 'src/app/service/image.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  std!: Stds;
  title!: string;
  subtitle!: string;

  constructor(
    private rmuttService: RmuttService,
    public imageService: ImageService
  ) { }

  ngOnInit(): void {
    
    this.std = {} as Stds;

    this.rmuttService.getDetail().subscribe({
      next: (res) => {
        this.std = res.data[0];
      }
    });

    this.rmuttService.settings().subscribe({
      next: (res) => {
        this.title = res.data.title;
        this.subtitle = res.data.subtitle;
      }
    });
  }

}
