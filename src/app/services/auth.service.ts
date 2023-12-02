import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUser } from '../model/user.inteface';
import { ILoginResponse } from '../model/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: IUser | undefined;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<ILoginResponse>('/api/auth/login', { email, password })
      .pipe(map((response) => {
        this.setToken(response.token);
        this.user = response.user;
        return response.user;
      }));
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  };

  public getUser(): IUser | undefined {
    return this.user;
  };
}
