import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(AuthService);

  if (req.url.includes('auth/login') || req.url.includes('auth/register')) {
    return next(req);
  }

  if (tokenService.getToken()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });
  }
  return next(req);
};
