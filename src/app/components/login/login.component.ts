import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFormGroup: UntypedFormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private formBuild: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginFormGroup = this.formBuild.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, Validators.required],
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  login(): void {
    if (this.loginFormGroup.valid) {
      this.authService
        .login(
          this.loginFormGroup.get('email')?.value,
          this.loginFormGroup.get('password')?.value
        )
        .subscribe(
          (user) => {
            if (user) {
              this.router.navigate(['/home']);
            }
          },
          (err) => {
            if (err.status === 401) {
              this.openSnackBar('Senha incorreta');
            }
            if (err.status === 404) {
              this.openSnackBar('Email incorreto');
            }
          }
        );
    }
  }
}
