import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  errorMessage = '';
  modelForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.modelForm.valid) {
      const { username, password } = this.modelForm.value;
  
      this.authService.login(username, password).subscribe(
        (response) => {
          if (response && response.token) {
            this.authService.setToken(response.token);
            this.router.navigate(['admin']);
          } else {
            setTimeout(() => this.errorMessage = '' , 2000);
            this.errorMessage = 'Usuario no autorizado';
          }
        },
        (error) => {
          setTimeout(() => this.errorMessage = '' , 2000);
          this.errorMessage = error?.error?.message || 'Error en el inicio de sesión';
        }
      );
    } else {
      setTimeout(() => this.errorMessage = '' , 2000);
      this.errorMessage = 'Formulario no válido';
      console.log('Formulario no válido');
    }
  }
}
