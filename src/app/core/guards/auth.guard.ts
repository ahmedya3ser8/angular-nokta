import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

import { AuthService } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  }
  return authService.getUserData().pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/auth/signin'])))
  );
};
