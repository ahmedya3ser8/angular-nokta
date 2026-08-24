import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../../core';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  form!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.isLoading = true;
      this.authService.signup(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.notification.success(res.message);
          this.router.navigate(['/auth/signin']);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.notification.error(err.error.message);
          this.isLoading = false;
        }
      })
    }
    else {
      this.form.markAllAsTouched();
    }
  }
}
