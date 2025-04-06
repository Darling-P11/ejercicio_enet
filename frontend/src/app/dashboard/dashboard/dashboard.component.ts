import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  username: string = '';
  role: string = '';

  constructor(private auth: AuthService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const payload: any = this.auth.decodeToken();
      this.username = payload.username;
      this.role = payload.rolname;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

