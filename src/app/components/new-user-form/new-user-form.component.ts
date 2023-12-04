import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
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
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/user.inteface';

export class CustomValidator {
  static isValidCpf() {
    return (control: AbstractControl): Validators | null => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
          return null;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return null;
        } else {
          return { cpfNotValid: true };
        }
      }
      return null;
    };
  }
}

@Component({
  selector: 'app-new-user-form',
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
  templateUrl: './new-user-form.component.html',
  styleUrl: './new-user-form.component.scss',
})
export class NewUserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      pizzas: this.formBuilder.array([this.createUserGroup()]),
    });
  }

  createUserGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, CustomValidator.isValidCpf]],
      password: ['', [Validators.required]],
      street: ['', Validators.required],
      number: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  createUser(): void {
    const request: IUser = {
      name:  this.userForm.get('name')?.value,
      cpf:  this.userForm.get('cpf')?.value,
      email:  this.userForm.get('email')?.value,
      password:  this.userForm.get('password')?.value,
      address:{
        street: this.userForm.get('street')?.value,
        city: this.userForm.get('city')?.value,
        number: this.userForm.get('number')?.value,
        postcode: this.userForm.get('postcode')?.value,
        state: this.userForm.get('state')?.value,
      }
    }

    this.userService.createUser(request)
      .subscribe((response) => {
        this.userService.setUser(response);
      })
  }
}
