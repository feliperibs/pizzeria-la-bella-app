import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PizzaService } from '../../services/pizza.service';
import { IPizza } from '../../model/pizza-interface';
import { FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NewPizzaFormComponent } from './new-pizza-form/new-pizza-form.component';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-pizza-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NewPizzaFormComponent,
  ],
  templateUrl: './pizza-menu.component.html',
  styleUrl: './pizza-menu.component.scss',
})
export class PizzaMenuComponent implements OnInit {
  pizzas: IPizza[] = [];
  pizzaForm!: FormGroup;
  showAddPizzas = false;
  isAdmin!: boolean;

  constructor(
    private pizzaService: PizzaService,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getPizzas();
    this.userService.isAdmin.subscribe((value) => {
      this.isAdmin = value;
    });
  }

  createPizza(): void {
    this.showAddPizzas = true;
  }

  getPizzas(): void {
    this.showAddPizzas = false;
    this.pizzaService.getPizzas().subscribe((pizzas) => (this.pizzas = pizzas));
  }

  addToOrder(pizzaId: string) {
    this.orderService.addPizzaToOder(pizzaId);
  }
}
