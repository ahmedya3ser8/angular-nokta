import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { NoktaService } from '../services/nokta.service';
import { ApiResponse } from '../../../core';
import { Nokta } from '../models/nokta';

export const personDetailsResolver: ResolveFn<ApiResponse<Nokta[]>> = (route, state) => {
  const noktaService = inject(NoktaService);
  const personId = route.paramMap.get('id')!;
  return noktaService.getAllById(personId);
};
