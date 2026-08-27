import { Routes } from "@angular/router";

import { NoktaListComponent } from "./pages/nokta-list/nokta-list.component";
import { PersonDetailsComponent } from "./pages/person-details/person-details.component";
import { personDetailsResolver } from "./resolvers/person-details.resolver";

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
    resolve: { data: personDetailsResolver },
    title: 'نقوط — تفاصيل النقطة'
  }
];
