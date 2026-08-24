import { Routes } from "@angular/router";

import { SigninComponent } from "./pages/signin/signin.component";
import { SignupComponent } from "./pages/signup/signup.component";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'نقوط — إنشاء حساب'
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'نقوط — تسجيل الدخول'
  }
];
