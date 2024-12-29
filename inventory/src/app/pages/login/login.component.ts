import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';  
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiRestService } from '../../services/api-rest.service';
import { UserLogin } from '../../models/user-login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatError,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  userLogin: UserLogin = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  onSubmit() {
    this.userLogin.username = this.loginForm.get('username')?.value ?? '';
    this.userLogin.password = this.loginForm.get('password')?.value ?? '';


    this.authservice.login(this.userLogin).subscribe(
      (response) => {
        console.log('login success');
        this.authservice.setToken(response.token);
        this.router.navigate(['/home/inventario']);
      },
      error => {
        console.log(error);
      }
    );
  } 
}
