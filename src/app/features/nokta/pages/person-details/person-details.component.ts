import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Nokta } from '../../models/nokta';

@Component({
  selector: 'app-person-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  noktas: Nokta[] = [];

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: ({ data }) => {
        this.noktas = data.data;
        console.log(data.data);
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
