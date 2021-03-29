import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { SolicitacaoService } from './solicitacao.service';
import { SolicitacaoDeleteDialogComponent } from './solicitacao-delete-dialog.component';

@Component({
  selector: 'jhi-solicitacao',
  templateUrl: './solicitacao.component.html',
})
export class SolicitacaoComponent implements OnInit, OnDestroy {
  solicitacaos?: ISolicitacao[];
  eventSubscriber?: Subscription;

  constructor(
    protected solicitacaoService: SolicitacaoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.solicitacaoService.query().subscribe((res: HttpResponse<ISolicitacao[]>) => (this.solicitacaos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSolicitacaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISolicitacao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSolicitacaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('solicitacaoListModification', () => this.loadAll());
  }

  delete(solicitacao: ISolicitacao): void {
    const modalRef = this.modalService.open(SolicitacaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.solicitacao = solicitacao;
  }
}
