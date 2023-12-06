import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: any;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['setUser'], {
      isAdmin: new BehaviorSubject(true),
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call the HTTP client with correct URL and POST method', () => {
      const email = 'test@example.com';
      const password = 'testpassword';
      const loginResponse = {
        token: 'abc123',
        user: {
          id: 1,
          email: email,
        },
      };

      httpClientSpy.post.and.returnValue(of(loginResponse));

      service.login(email, password).subscribe();

      expect(httpClientSpy.post).toHaveBeenCalledWith('https://pizzaria-la-bella-api.netlify.app/auth/login', {
        email,
        password,
      });
    });

    it('should return the user from the login response', () => {
      const email = 'test@example.com';
      const password = 'testpassword';
      const loginResponse = {
        token: 'abc123',
        user: {
          id: 1,
          email: email,
        },
      };

      httpClientSpy.post.and.returnValue(of(loginResponse));

      const userObservable = service.login(email, password);

      userObservable.subscribe((user) => {
        expect(user).toEqual(loginResponse.user as any);
      });
    });
  });

  describe('logOut', () => {
    it('should remove the token from local storage and update the logged in status', () => {
      spyOn(localStorage, 'removeItem');
      spyOn(service.isLogged, 'next');

      service.logOut();

      expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(service.isLogged.next).toHaveBeenCalledWith(false);
    });
  });

});
