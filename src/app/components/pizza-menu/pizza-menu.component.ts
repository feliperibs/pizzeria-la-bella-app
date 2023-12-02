import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PizzaService } from '../../services/pizza.service';
import { IPizza } from '../../model/pizza-interface';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pizza-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './pizza-menu.component.html',
  styleUrl: './pizza-menu.component.scss',
})
export class PizzaMenuComponent implements OnInit {
  pizzas: IPizza[] = [];
  pizzaForm!: FormGroup;

  constructor(
    private pizzaService: PizzaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pizzaForm = this.formBuilder.group({
      pizzas: this.formBuilder.array([this.createPizzaGroup()]),
    });

    this.pizzaService.getPizzas().subscribe((pizzas) => (this.pizzas = pizzas));
  }

  createPizzaGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  get formPizzas(): FormArray {
    return this.pizzaForm.get('pizzas') as FormArray;
  }

  get formControls() {
    return this.pizzaForm.controls;
  }

  addPizza() {
    this.formPizzas.push(this.createPizzaGroup());
  }

  removePizza(index: number) {
    this.formPizzas.removeAt(index);
  }

  savePizzas(): void {
    this.pizzaService.createPizzas(this.formPizzas.value)
      .subscribe(pizzas => {
        debugger
      })
  }
}
