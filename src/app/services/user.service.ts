import { Injectable } from '@angular/core';
import { IUser } from '../model/user.inteface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPizza } from '../model/pizza-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  user!: IUser;

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('/api/users');
  }

  setUser(user: IUser): void {
    this.user = user;
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('/api/user/create', { user });
  }
}