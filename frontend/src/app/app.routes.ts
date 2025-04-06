import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { AdminComponent } from './dashboard/admin/admin.component';
import { GestorComponent } from './dashboard/gestor/gestor.component';
import { CajeroComponent } from './dashboard/cajero/cajero.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
export const routes: Routes =[
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // ✅ Layout con rutas hijas según el rol
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'gestor', component: GestorComponent },
      { path: 'cajero', component: CajeroComponent },
      { path: 'bienvenida', component: WelcomeComponent },
      { path: '', redirectTo: 'admin', pathMatch: 'full' } // 👈 Este puede ser dinámico luego
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
