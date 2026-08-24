import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { catchError, map, of } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/nokta']);
  }

  return authService.getUserData().pipe(
    map(() => {
      return router.createUrlTree(['/nokta']);
    }),
    catchError(() => {
      return of(true);
    })
  )
};
