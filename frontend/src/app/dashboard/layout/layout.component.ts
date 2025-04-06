import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { AuthService} from '../../core/auth.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true, // 👈 Declaración standalone
  imports: [CommonModule, RouterModule], // 👈 Módulos necesarios
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})



export class LayoutComponent implements OnInit {
  menu: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const rol = this.auth.getRole();

    // Redirección automática si solo accede a /dashboard
    const currentRoute = this.router.url;
    if (currentRoute === '/dashboard') {
      if (rol === 'admin') {
        this.router.navigate(['admin'], { relativeTo: this.route });
      } else if (rol === 'gestor') {
        this.router.navigate(['gestor'], { relativeTo: this.route });
      } else if (rol === 'cajero') {
        this.router.navigate(['cajero'], { relativeTo: this.route });
      }
    }

    // Cargar menú según rol
    if (rol === 'admin') {
      this.menu = [
        { path: '/dashboard/admin', label: 'Inicio Admin' },
        { path: '/usuarios', label: 'Usuarios' },
        { path: '/cajas', label: 'Cajas' }
      ];
    } else if (rol === 'gestor') {
      this.menu = [
        { path: '/dashboard/gestor', label: 'Inicio Gestor' },
        { path: '/turnos', label: 'Asignar Turnos' }
      ];
    } else if (rol === 'cajero') {
      this.menu = [
        { path: '/dashboard/cajero', label: 'Inicio Cajero' },
        { path: '/clientes', label: 'Clientes' },
        { path: '/caja', label: 'Procesos de Caja' }
      ];
    }
  }
}


