import { Routes } from '@angular/router';
import { PizzaMenuComponent } from './components/pizza-menu/pizza-menu.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { authGuard } from './guards/auth.guard';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';

export const routes: Routes = [
  {
    path: '',
    component: PizzaMenuComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'new-user',
    component: NewUserFormComponent,
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'all-orders',
    component: AllOrdersComponent,
    canActivate: [authGuard]
  },
];
