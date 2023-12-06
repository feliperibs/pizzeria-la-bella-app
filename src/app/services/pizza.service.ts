import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPizza, IPizzaRequest } from '../model/pizza-interface';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>('https://pizzaria-la-bella-api.netlify.app/api/pizzas');
  }
  getPizza(id: string): Observable<IPizza> {
    return this.http.get<IPizza>('https://pizzaria-la-bella-api.netlify.app/api/pizzas/' + id);
  }

  createPizzas(pizzas: IPizzaRequest[]): Observable<IPizza[]> {
    return this.http.post<IPizza[]>('https://pizzaria-la-bella-api.netlify.app/api/pizzas/create', pizzas);
  }
}
