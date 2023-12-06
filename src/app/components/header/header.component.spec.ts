import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { PizzaService } from '../../services/pizza.service';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { IPizza } from '../../model/pizza-interface';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let snackBar: MatSnackBar;
  let pizzaServiceSpy: jasmine.SpyObj<PizzaService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['setUser'], {
      isAdmin: new BehaviorSubject(true),
    });
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logOut'], {
      isLogged: new BehaviorSubject(true),
    });
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['createOrder', 'clearOrder'], {
      pizzasAdded: new BehaviorSubject<string[]>(['1', '2', '3']),
    });
    pizzaServiceSpy = jasmine.createSpyObj('PizzaService', ['getPizza'], {
      pizzasAdded: new BehaviorSubject<string[]>(['1', '2', '3']),
    });

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: PizzaService, useValue: pizzaServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add pizza to cart', () => {
    const pizza: IPizza = { id: '1', name: 'Cheese Pizza', price: 10 } as any;
    pizzaServiceSpy.getPizza.and.returnValue(of(pizza));

    component.addPizzaToCart('1');

    expect(component.addedPizzas.length).toBe(1);
    expect(component.addedPizzas[0]).toEqual(pizza);
  });

  it('should call logout', () => {
    spyOn(router, 'navigate');

    component.logout();

    expect(authServiceSpy.logOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should create order if user is logged in', () => {
    userServiceSpy.user = { _id: '1' } as any;
    const orderSpy = orderServiceSpy.createOrder.and.returnValue(of({} as any));

    component.createOrder();

    expect(orderSpy).toHaveBeenCalledWith('1');
    expect(orderServiceSpy.clearOrder).toHaveBeenCalled();
  });

  it('should navigate to login page if user is not logged in', () => {
    userServiceSpy.setUser(null as any);
    spyOn(router, 'navigate');

    component.createOrder();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
