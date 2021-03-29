import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDebito } from 'app/shared/model/debito.model';
import { DebitoService } from './debito.service';
import { DebitoDeleteDialogComponent } from './debito-delete-dialog.component';

@Component({
  selector: 'jhi-debito',
  templateUrl: './debito.component.html',
})
export class DebitoComponent implements OnInit, OnDestroy {
  debitos?: IDebito[];
  eventSubscriber?: Subscription;

  constructor(protected debitoService: DebitoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.debitoService.query().subscribe((res: HttpResponse<IDebito[]>) => (this.debitos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDebitos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDebito): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDebitos(): void {
    this.eventSubscriber = this.eventManager.subscribe('debitoListModification', () => this.loadAll());
  }

  delete(debito: IDebito): void {
    const modalRef = this.modalService.open(DebitoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.debito = debito;
  }
}
