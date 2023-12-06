import { Injectable } from '@angular/core';
import { IUser, IUserRequest } from '../model/user.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAdmin = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient) {
    this.user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    this.isAdmin.next(!!this.user?.is_admin);

  }

  user!: IUser;

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('/api/users');
  }

  setUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user))
    this.user = user;
    this.isAdmin.next(!!user.is_admin);
  }

  createUser(user: IUserRequest): Observable<IUser> {
    return this.http.post<IUser>('/api/users/create', user);
  }
}
