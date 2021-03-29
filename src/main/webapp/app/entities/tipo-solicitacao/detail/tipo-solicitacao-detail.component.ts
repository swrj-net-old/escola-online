import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoSolicitacao } from '../tipo-solicitacao.model';

@Component({
  selector: 'jhi-tipo-solicitacao-detail',
  templateUrl: './tipo-solicitacao-detail.component.html',
})
export class TipoSolicitacaoDetailComponent implements OnInit {
  tipoSolicitacao: ITipoSolicitacao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoSolicitacao }) => {
      this.tipoSolicitacao = tipoSolicitacao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
