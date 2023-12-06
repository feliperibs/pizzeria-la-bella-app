import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { MyOrdersComponent } from './my-orders.component';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/user.interface';

describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;
  let orderService: jasmine.SpyObj<OrderService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    orderService = jasmine.createSpyObj('OrderService', ['getUserOrders']);
    userService = jasmine.createSpyObj('UserService', ['']);
    userService.user = { _id: '1' } as IUser;

    await TestBed.configureTestingModule({
      imports: [MyOrdersComponent],
      providers: [
        { provide: OrderService, useValue: orderService },
        { provide: UserService, useValue: userService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    orderService.getUserOrders.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
