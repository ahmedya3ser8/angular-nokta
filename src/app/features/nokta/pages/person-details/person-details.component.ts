import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { NoktaService } from '../../services/nokta.service';
import { Nokta } from '../../models/nokta';

@Component({
  selector: 'app-person-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly noktaService = inject(NoktaService);

  noktas: Nokta[] = [];

  ngOnInit(): void {
    this.getPersonId();
  }

  getPersonId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (value) => {
        const id = value.get('id')!;
        this.getAllById(id);
      }
    })
  }

  getAllById(personId: string): void {
    this.noktaService.getAllById(personId).subscribe({
      next: (res) => {
        console.log(res);
        this.noktas = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  totalReceived(): number {
    return this.noktas.filter(n => n.transactionType === 'received').reduce((acc, value) => acc + value.amount, 0);
  }

  totalGiven(): number {
    return this.noktas.filter(n => n.transactionType === 'given').reduce((acc, value) => acc + value.amount, 0);
  }

  netBalance(): number {
    return this.totalReceived() - this.totalGiven();
  }
}
