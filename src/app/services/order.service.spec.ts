import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject, throwError } from 'rxjs';

import { OrderService } from './order.service';
import { IOrder, IOrderRequest } from '../model/order.interface';
import { HttpClient } from '@angular/common/http';

describe('OrderService', () => {
  let service: OrderService;
  let httpClientSpy: any;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(OrderService);
    service.pizzaIds= ['1', '2'];
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserOrders', () => {
    it('should call the HTTP client with the correct URL and GET method', () => {
      const userId = 'user123';
      const orders = [{ id: 1, userId, pizzas: [], createdAt: new Date() }];

      httpClientSpy.get.and.returnValue(of(orders));

      service.getUserOrders(userId);

      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/orders/user/' + userId);
    });
  });

  describe('getAllOrders', () => {
    it('should call the HTTP client with the correct URL and GET method', () => {
      const orders = [{ id: 1, userId: 'user123', pizzas: [], createdAt: new Date() }];

      httpClientSpy.get.and.returnValue(of(orders));

      service.getAllOrders();

      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/orders/');
    });
  });


});
