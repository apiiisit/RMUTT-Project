import { Component } from '@angular/core';
import { ElectronService } from '../../services/electron.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {

  constructor(private electronService: ElectronService) { }

}
