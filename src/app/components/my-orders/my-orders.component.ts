import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { IOrder } from '../../model/order.interface';
import { UserService } from '../../services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent implements OnInit {
  orders: IOrder[] = [];
  displayedColumns: string[] = ['number', 'orderDate', 'price', 'pizzas'];
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.orderService.getUserOrders(this.userService.user._id)
      .subscribe(orders => {
        this.orders = orders;
        this.isLoading = false;
      })
  }
}
