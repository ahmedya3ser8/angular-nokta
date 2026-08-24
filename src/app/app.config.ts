import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import localeAr from '@angular/common/locales/ar-EG';
import { registerLocaleData } from '@angular/common';

import { routes } from './app.routes';

registerLocaleData(localeAr)

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ]
};
