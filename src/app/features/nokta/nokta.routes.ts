import { Routes } from "@angular/router";

import { NoktaListComponent } from "./pages/nokta-list/nokta-list.component";
import { PersonDetailsComponent } from "./pages/person-details/person-details.component";

export const NOKTA_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'nokta',
    pathMatch: 'full'
  },
  {
    path: 'nokta',
    component: NoktaListComponent,
    title: 'نقوط — قائمة النقوط'
  },
  {
    path: 'person/:id',
    component: PersonDetailsComponent,
    title: 'نقوط — تفاصيل النقطة'
  }
];
