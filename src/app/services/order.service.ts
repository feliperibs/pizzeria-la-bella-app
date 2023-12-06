import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IOrder, IOrderRequest } from '../model/order.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  pizzaIds: string[] = [];
  pizzasAdded = new Subject<string[]>();
  constructor(private http: HttpClient) {}

  addPizzaToOder(id: string) {
    this.pizzaIds.push(id);
    this.pizzasAdded.next(this.pizzaIds);
  }

  createOrder(userId: string): Observable<IOrder> {
    if (this.pizzaIds.length > 0) {
      const request: IOrderRequest = {
        userId,
        pizzasIds: this.pizzaIds,
      };

      return this.http.post<IOrder>('https://pizzaria-la-bella-api.netlify.app/orders/create', request);
    } else {
      throw new Error('Need to add one pizza');
    }
  }

  getUserOrders(userId: string): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('https://pizzaria-la-bella-api.netlify.app/orders/user/' + userId);
  }


  getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('https://pizzaria-la-bella-api.netlify.app/orders/');
  }

  clearOrder(): void {
    this.pizzaIds = [];
    this.pizzasAdded.next(this.pizzaIds);
  }
}
