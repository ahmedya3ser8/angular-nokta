import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../../auth/services/auth.service';
import { NoktaService } from '../../services/nokta.service';
import { Nokta } from '../../models/nokta';
import { NotificationService } from '../../../../core';

@Component({
  selector: 'app-nokta-list',
  imports: [ReactiveFormsModule, DatePipe, FormsModule],
  templateUrl: './nokta-list.component.html',
  styleUrl: './nokta-list.component.css'
})
export class NoktaListComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly noktaService = inject(NoktaService);
  private readonly notification = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  private searchSubject = new Subject<string>();

  isModalOpen: boolean = false;
  isLoading: boolean = false;
  isLoadingNoktas: boolean = false;
  isEditMode: boolean = false;
  isDeleting: boolean = false;
  form!: FormGroup;
  noktas: Nokta[] = [];
  noktaId: string = '';
  searchTerm: string = '';
  noktaToDelete: Nokta | null = null;

  ngOnInit(): void {
    this.getAll();
    this.searchSubject
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(search => {
      this.getAll(search);
    });
  }

  getAll(search: string = ''): void {
    this.isLoadingNoktas = true;
    this.noktaService.getAll(search).subscribe({
      next: (res) => {
        console.log(res);
        this.noktas = res.data;
        this.isLoadingNoktas = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoadingNoktas = false;
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
        this.notification.success(res.message);
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

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onDelete(nokta: Nokta): void {
    this.noktaToDelete = nokta;
  }

  cancelDelete(): void {
    this.noktaToDelete = null;
  }

  confirmDelete(): void {
    if (!this.noktaToDelete) return;
    this.isDeleting = true;
    this.noktaService.remove(this.noktaToDelete._id).subscribe({
      next: (res) => {
        console.log(res);
        this.isDeleting = false;
        this.noktaToDelete = null;
        this.getAll();
        this.notification.success(res.message);
      },
      error: (err) => {
        console.log(err);
        this.isDeleting = false;
      }
    })
  }
}
