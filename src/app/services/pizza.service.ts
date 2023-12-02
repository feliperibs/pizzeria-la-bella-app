import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPizza } from '../model/pizza-interface';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>('/api/pizzas');
  }

  createPizzas(pizzas: IPizza[]): Observable<IPizza[]> {
    return this.http.post<IPizza[]>('/api/pizzas/create', pizzas);
  }
}
