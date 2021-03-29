import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChamada } from '../chamada.model';

@Component({
  selector: 'jhi-chamada-detail',
  templateUrl: './chamada-detail.component.html',
})
export class ChamadaDetailComponent implements OnInit {
  chamada: IChamada | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chamada }) => {
      this.chamada = chamada;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
