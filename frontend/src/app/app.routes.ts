import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { AdminComponent } from './dashboard/admin/admin.component';
import { GestorComponent } from './dashboard/gestor/gestor.component';
import { CajeroComponent } from './dashboard/cajero/cajero.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard/admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/gestor',
    component: GestorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/cajero',
    component: CajeroComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
