import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PizzaMenuComponent } from './components/pizza-menu/pizza-menu.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'menu',
    component:PizzaMenuComponent
  },
  {
    path: 'login',
    component:LoginComponent
  }
];
