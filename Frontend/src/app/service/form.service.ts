import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private idRegEx: RegExp = /^\d{12}-\d{1}$/;
  private nameRegEx: RegExp = /^\S+ \S+$/;
  private numRegEx: RegExp = /^\d{1,}$/;
  private honorRegEx: RegExp = /^[1,2]$/;
  private yearRegEx: RegExp = /^\d{4}[/]\d{1}$/;

  mode!: string;

  stdForm: FormGroup = new FormGroup({
    row: new FormControl(null, [Validators.required, Validators.maxLength(4), Validators.pattern(this.numRegEx)]),
    rowfaculty: new FormControl(null, [Validators.required, Validators.maxLength(4), Validators.pattern(this.numRegEx)]),
    degree: new FormControl(null, Validators.required),
    honor: new FormControl(null, Validators.pattern(this.honorRegEx)),
    id: new FormControl(null, [Validators.required, Validators.pattern(this.idRegEx)]),
    prefixname: new FormControl(null, Validators.required),
    name: new FormControl(null, [Validators.required, Validators.pattern(this.nameRegEx)]),
    award: new FormControl(null),
    faculty: new FormControl(null, Validators.required),
    year: new FormControl(null, [Validators.required, Validators.pattern(this.yearRegEx)])
  });

  settingForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    subtitle: new FormControl(null, Validators.required)
  });

  eventEditForm: FormGroup = new FormGroup({
    eventid: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required)
  });

  docForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required)
  });

  pointForm: FormGroup = new FormGroup({
    pointid: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required)
  });

  constructor() { }

}
