import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [CommonModule]
})

export class WelcomeComponent implements OnInit {
  nombreUsuario: string = '';
  rol: string = '';
  totalTurnos: number = 0;
  usuariosPendientes: number = 0;

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.nombreUsuario = this.auth.getUserName();
    this.rol = this.auth.getRole() || '';

    if (this.rol === 'admin') {
      this.http.get<number>('http://localhost:3000/api/turns/today').subscribe(res => {
        this.totalTurnos = res;
      });
    }

    if (this.rol === 'gestor') {
      const id = this.auth.getUserId();
      this.http.get<number>(`http://localhost:3000/api/turns/today/${id}`).subscribe(res => {
        this.totalTurnos = res;
      });

      this.http.get<number>('http://localhost:3000/api/users/pending-count').subscribe(res => {
        this.usuariosPendientes = res;
      });
    }
  }
}
