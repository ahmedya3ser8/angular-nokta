import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../../core';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
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
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.isLoading = true;
      this.authService.signin(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.notification.success(res.message);
          this.router.navigate(['/nokta']);
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
