import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoricoDebito } from '../historico-debito.model';

@Component({
  selector: 'jhi-historico-debito-detail',
  templateUrl: './historico-debito-detail.component.html',
})
export class HistoricoDebitoDetailComponent implements OnInit {
  historicoDebito: IHistoricoDebito | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historicoDebito }) => {
      this.historicoDebito = historicoDebito;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
