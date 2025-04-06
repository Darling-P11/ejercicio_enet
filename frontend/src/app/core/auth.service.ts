import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; 
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';


  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('rol');
  }
  getUserName(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload: any = jwtDecode(token);
    return payload.username;
  }
  
  getUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) return 0;
    const payload: any = jwtDecode(token);
    return payload.userid;
  }
  
  
}
