import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { OrderService } from '../../services/order.service';
import { PizzaService } from '../../services/pizza.service';
import { IPizza } from '../../model/pizza-interface';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  isAdmin = false;
  addedPizzas: IPizza[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private pizzaService: PizzaService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe((value) => {
      this.isLogged = value;
    });

    this.userService.isAdmin.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.orderService.pizzasAdded.subscribe((pizzaIds) => {
      if (pizzaIds.length > 0) {
        this.addedPizzas = [];
        pizzaIds.forEach((id) => {
          this, this.addPizzaToCart(id);
        });
      }
    });
  }

  addPizzaToCart(id: string): void {
    this.pizzaService.getPizza(id).subscribe((pizza) => {
      this.addedPizzas.push(pizza);
    });
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  createOrder(): void {
    if (this.userService.user) {
      const userId = this.userService.user._id;
      this.orderService.createOrder(userId).subscribe((pizza) => {
        this.snackBar.open('Pedido Criado com Sucesso', 'Fechar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.orderService.clearOrder();
        this.router.navigate(['/my-orders']);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
