import { Component } from '@angular/core';
import { WelcomeComponent } from '../../dashboard/welcome/welcome.component';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [WelcomeComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {}