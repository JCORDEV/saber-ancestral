import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private readonly TOKEN_KEY = 'authToken';
  constructor(protected http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let route = [environment.apiUrl, 'login'].join('/');
    return this.http.post(route, { username, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Maneja el error 401 sin imprimir en consola
          console.warn("Credenciales incorrectas");  // Muestra un mensaje más silencioso
          setTimeout(() => console.clear(), 50);
          return of({ token: null });  // Devuelve un observable sin token
        } else {
          // Maneja otros errores
          return throwError(() => new Error('Ocurrió un error en la autenticación'));
        }
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null;
  }

  getToken(): string | null {
    // console.log(localStorage.getItem('authToken'))
    return localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
