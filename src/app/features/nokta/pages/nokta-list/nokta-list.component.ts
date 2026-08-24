import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { NoktaService } from '../../services/nokta.service';
import { Nokta } from '../../models/nokta';

@Component({
  selector: 'app-nokta-list',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './nokta-list.component.html',
  styleUrl: './nokta-list.component.css'
})
export class NoktaListComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly noktaService = inject(NoktaService);

  isModalOpen: boolean = false;
  isLoading: boolean = false;
  isEditMode: boolean = false;

  form!: FormGroup;

  noktas: Nokta[] = [];
  noktaId: string = '';

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.noktaService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.noktas = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  initForm(): void {
    this.form = this.fb.group({
      personName: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      transactionType: ['received', [Validators.required]],
      occasionType: ['wedding', [Validators.required]],
      date: [this.getToday(), [Validators.required]]
    })
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.isEditMode) {
        this.updateNokta();
      } else {
        this.createNokta();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  createNokta(): void {
    this.isLoading = true;
    this.noktaService.create(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.closeModal();
        this.getAll();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  openModal(): void {
    this.initForm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  formatDateForInput(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/signin']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onView(personId: string): void {
    console.log(personId);
    this.router.navigate(['/person', personId]);
  }

  onEdit(nokta: Nokta): void {
    console.log(nokta);
    this.openModal();
    this.noktaId = nokta._id;
    this.isEditMode = true;
    this.fillForm(nokta);
  }

  onDelete(noktaId: string): void {
    console.log(noktaId);
    this.noktaService.remove(noktaId).subscribe({
      next: (res) => {
        console.log(res);
        this.getAll();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  fillForm(nokta: Nokta): void {
    this.form.patchValue({
      personName: nokta.person.name,
      amount: nokta.amount,
      transactionType: nokta.transactionType,
      occasionType: nokta.occasionType,
      date: this.formatDateForInput(nokta.date),
    })
  }

  updateNokta(): void {
    this.isLoading = true;
    this.noktaService.update(this.noktaId, this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.closeModal();
        this.getAll();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }
}
