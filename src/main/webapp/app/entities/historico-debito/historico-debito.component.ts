import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoricoDebito } from 'app/shared/model/historico-debito.model';
import { HistoricoDebitoService } from './historico-debito.service';
import { HistoricoDebitoDeleteDialogComponent } from './historico-debito-delete-dialog.component';

@Component({
  selector: 'jhi-historico-debito',
  templateUrl: './historico-debito.component.html',
})
export class HistoricoDebitoComponent implements OnInit, OnDestroy {
  historicoDebitos?: IHistoricoDebito[];
  eventSubscriber?: Subscription;

  constructor(
    protected historicoDebitoService: HistoricoDebitoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.historicoDebitoService.query().subscribe((res: HttpResponse<IHistoricoDebito[]>) => (this.historicoDebitos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoricoDebitos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoricoDebito): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoricoDebitos(): void {
    this.eventSubscriber = this.eventManager.subscribe('historicoDebitoListModification', () => this.loadAll());
  }

  delete(historicoDebito: IHistoricoDebito): void {
    const modalRef = this.modalService.open(HistoricoDebitoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historicoDebito = historicoDebito;
  }
}
