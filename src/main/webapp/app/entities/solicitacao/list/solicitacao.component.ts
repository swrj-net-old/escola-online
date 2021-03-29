import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISolicitacao } from '../solicitacao.model';
import { SolicitacaoService } from '../service/solicitacao.service';
import { SolicitacaoDeleteDialogComponent } from '../delete/solicitacao-delete-dialog.component';

@Component({
  selector: 'jhi-solicitacao',
  templateUrl: './solicitacao.component.html',
})
export class SolicitacaoComponent implements OnInit {
  solicitacaos?: ISolicitacao[];
  isLoading = false;

  constructor(protected solicitacaoService: SolicitacaoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.solicitacaoService.query().subscribe(
      (res: HttpResponse<ISolicitacao[]>) => {
        this.isLoading = false;
        this.solicitacaos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISolicitacao): number {
    return item.id!;
  }

  delete(solicitacao: ISolicitacao): void {
    const modalRef = this.modalService.open(SolicitacaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.solicitacao = solicitacao;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
