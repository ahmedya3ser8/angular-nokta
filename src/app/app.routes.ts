import { Routes } from '@angular/router';

import { authGuard, guestGuard } from './core';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./features/nokta/nokta.routes').then(r => r.NOKTA_ROUTES)
  },
];
