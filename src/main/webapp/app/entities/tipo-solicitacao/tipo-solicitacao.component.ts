import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';
import { TipoSolicitacaoService } from './tipo-solicitacao.service';
import { TipoSolicitacaoDeleteDialogComponent } from './tipo-solicitacao-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-solicitacao',
  templateUrl: './tipo-solicitacao.component.html',
})
export class TipoSolicitacaoComponent implements OnInit, OnDestroy {
  tipoSolicitacaos?: ITipoSolicitacao[];
  eventSubscriber?: Subscription;

  constructor(
    protected tipoSolicitacaoService: TipoSolicitacaoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tipoSolicitacaoService.query().subscribe((res: HttpResponse<ITipoSolicitacao[]>) => (this.tipoSolicitacaos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoSolicitacaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoSolicitacao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoSolicitacaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoSolicitacaoListModification', () => this.loadAll());
  }

  delete(tipoSolicitacao: ITipoSolicitacao): void {
    const modalRef = this.modalService.open(TipoSolicitacaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoSolicitacao = tipoSolicitacao;
  }
}
