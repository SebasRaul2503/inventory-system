import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { UserLogin } from '../models/user-login';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  private baseUrl = 'http://localhost:3000';

  login(userLogin: UserLogin) {
    return this.http.post<any>(`${this.baseUrl}/api/users/login`, userLogin);
  }

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  setToken(token: string) {
    this.cookieService.set('token', token);
  }

  clearToken() {
    this.cookieService.deleteAll()
  }

}
