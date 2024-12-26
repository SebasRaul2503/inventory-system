import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { UserLogin } from '../models/user-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:3000';

  login(userLogin: UserLogin) {
    return this.http.post<any>(`${this.baseUrl}/api/users/login`, userLogin);
  }
}
