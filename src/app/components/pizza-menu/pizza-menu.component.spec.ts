import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, from, of } from 'rxjs';

import { PizzaMenuComponent } from './pizza-menu.component';
import { PizzaService } from '../../services/pizza.service';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { NewPizzaFormComponent } from './new-pizza-form/new-pizza-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IPizza } from '../../model/pizza-interface';

describe('PizzaMenuComponent', () => {
  let component: PizzaMenuComponent;
  let fixture: ComponentFixture<PizzaMenuComponent>;
  let pizzaServiceSpy: jasmine.SpyObj<PizzaService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    pizzaServiceSpy = jasmine.createSpyObj('PizzaService', ['getPizzas']);
    userServiceSpy = jasmine.createSpyObj('UserService', [], {
      isAdmin: new BehaviorSubject(true),
    });
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['addPizzaToOder']);

    await TestBed.configureTestingModule({
      imports: [PizzaMenuComponent, NewPizzaFormComponent],
      providers: [
        { provide: PizzaService, useValue: pizzaServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaMenuComponent);
    component = fixture.componentInstance;

    pizzaServiceSpy.getPizzas.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the pizzas array with the pizzas returned from the server', () => {
    const mockPizzas: IPizza[] = [
      { _id: '1', name: 'Margherita', price: 9.99, description: '', imageUrl:'' },
      { _id: '2', name: 'Muzzarela', price: 9.99, description: '', imageUrl:'' },
    ];

    pizzaServiceSpy.getPizzas.and.returnValue(of(mockPizzas));
    component.getPizzas();
    expect(component.pizzas).toEqual(mockPizzas);
  });
});
