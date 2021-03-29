import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUnidade } from '../unidade.model';

@Component({
  selector: 'jhi-unidade-detail',
  templateUrl: './unidade-detail.component.html',
})
export class UnidadeDetailComponent implements OnInit {
  unidade: IUnidade | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidade }) => {
      this.unidade = unidade;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
