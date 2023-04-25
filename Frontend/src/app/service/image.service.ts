import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  defaultImage(event: Event, image: string = 'std') {
    return (event.target as HTMLImageElement).src = `assets/images/default-${image}.png`;
  }

}
