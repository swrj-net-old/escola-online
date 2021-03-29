import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoSolicitacao } from '../tipo-solicitacao.model';
import { TipoSolicitacaoService } from '../service/tipo-solicitacao.service';
import { TipoSolicitacaoDeleteDialogComponent } from '../delete/tipo-solicitacao-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-solicitacao',
  templateUrl: './tipo-solicitacao.component.html',
})
export class TipoSolicitacaoComponent implements OnInit {
  tipoSolicitacaos?: ITipoSolicitacao[];
  isLoading = false;

  constructor(protected tipoSolicitacaoService: TipoSolicitacaoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tipoSolicitacaoService.query().subscribe(
      (res: HttpResponse<ITipoSolicitacao[]>) => {
        this.isLoading = false;
        this.tipoSolicitacaos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITipoSolicitacao): number {
    return item.id!;
  }

  delete(tipoSolicitacao: ITipoSolicitacao): void {
    const modalRef = this.modalService.open(TipoSolicitacaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoSolicitacao = tipoSolicitacao;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
