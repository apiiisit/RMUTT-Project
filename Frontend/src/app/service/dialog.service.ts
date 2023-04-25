import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  importDialog!: boolean;
  stdDialog!: boolean;
  eventDialog!: boolean;
  eventEditDialog!: boolean;
  settingDialog!: boolean;
  docDialog!: boolean;
  pointDialog!: boolean;
  pointEditDialog!: boolean;

  constructor() { }

}
