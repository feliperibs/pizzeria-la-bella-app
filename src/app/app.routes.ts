import { Routes } from '@angular/router';
import { PizzaMenuComponent } from './components/pizza-menu/pizza-menu.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';

export const routes: Routes = [
  {
    path: '',
    component:PizzaMenuComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'new-user',
    component:NewUserFormComponent
  }
];
