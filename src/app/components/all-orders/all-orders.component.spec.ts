import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AllOrdersComponent } from './all-orders.component';
import { OrderService } from '../../services/order.service';

describe('AllOrdersComponent', () => {
  let component: AllOrdersComponent;
  let fixture: ComponentFixture<AllOrdersComponent>;
  let orderService: jasmine.SpyObj<OrderService>;
  beforeEach(async () => {
    orderService = jasmine.createSpyObj('OrderService', ['getAllOrders']);

    await TestBed.configureTestingModule({
      imports: [AllOrdersComponent],
      providers: [
        { provide: OrderService, useValue: orderService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllOrdersComponent);
    component = fixture.componentInstance;
    orderService.getAllOrders.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
