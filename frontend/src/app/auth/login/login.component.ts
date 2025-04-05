import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { fadeInOut } from '../../shared/animations'; 

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  animations: [fadeInOut]
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
  
    const { username, password } = this.loginForm.value;
  
    this.auth.login(username, password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.user.rol); // 👈 Guardamos el rol explícitamente
    
        const rol = response.user.rol;
        console.log('ROL DETECTADO:', rol);
    
        if (rol === 'admin') {
          this.router.navigate(['/dashboard/admin']);
        } else if (rol === 'gestor') {
          this.router.navigate(['/dashboard/gestor']);
        } else if (rol === 'cajero') {
          this.router.navigate(['/dashboard/cajero']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al iniciar sesión';
      }
    });
    
  }
  
  
  
  showPassword = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

}
