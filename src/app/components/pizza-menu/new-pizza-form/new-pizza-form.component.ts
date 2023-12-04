import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IPizza } from '../../../model/pizza-interface';
import { PizzaService } from '../../../services/pizza.service';

@Component({
  selector: 'app-new-pizza-form',
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
  templateUrl: './new-pizza-form.component.html',
  styleUrl: './new-pizza-form.component.scss',
})
export class NewPizzaFormComponent implements OnInit {
  @Output() loadPizzas = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

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
    this.pizzaService.createPizzas(this.formPizzas.value).subscribe(() => {
      this.loadPizzas.emit();
    });
  }
}
