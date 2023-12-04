import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUser } from '../model/user.inteface';
import { ILoginResponse } from '../model/login-response.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) {}

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<ILoginResponse>('https://pizzaria-la-bella-api.netlify.app/api/auth/login', { email, password })
      .pipe(map((response) => {
        this.setToken(response.token);
        this.userService.setUser(response.user);
        return response.user;
      }));
  }

  public get isLogged(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  };

  public logOut(): void {
    localStorage.removeItem('auth_token')
  }
}
