import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../../model/user.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent,BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and navigate to home when login form is valid', () => {
    authService.login.and.returnValue(of({} as IUser));


    component.loginFormGroup.get('email')?.setValue('test@example.com');
    component.loginFormGroup.get('password')?.setValue('password');
    component.login();

    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display snackbar with "Senha incorreta" when login fails with 401 status', () => {
    authService.login.and.returnValue(throwError({ status: 401 }));
    spyOn(component, 'openSnackBar');

    component.loginFormGroup.get('email')?.setValue('test@example.com');
    component.loginFormGroup.get('password')?.setValue('password');
    component.login();

    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
    expect(component.openSnackBar).toHaveBeenCalledWith('Senha incorreta');
  });

  it('should display snackbar with "Email incorreto" when login fails with 404 status', () => {
    authService.login.and.returnValue(throwError({ status: 404 }));
    spyOn(component, 'openSnackBar');

    component.loginFormGroup.get('email')?.setValue('test@example.com');
    component.loginFormGroup.get('password')?.setValue('password');
    component.login();

    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
    expect(component.openSnackBar).toHaveBeenCalledWith('Email incorreto');
  });

  it('should not call login and navigate to home when login form is invalid', () => {
        component.loginFormGroup.get('email')?.setValue('');
    component.loginFormGroup.get('password')?.setValue('');
    component.login();

    expect(authService.login).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to new-user route', () => {

    component.gotToNewUser();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/new-user']);
  });
});
