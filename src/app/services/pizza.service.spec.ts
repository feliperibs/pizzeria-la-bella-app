import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PizzaService } from './pizza.service';
import { HttpClient } from '@angular/common/http';

describe('PizzaService', () => {
  let service: PizzaService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PizzaService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(PizzaService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
