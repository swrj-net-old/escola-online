import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChamada } from 'app/shared/model/chamada.model';
import { ChamadaService } from './chamada.service';
import { ChamadaDeleteDialogComponent } from './chamada-delete-dialog.component';

@Component({
  selector: 'jhi-chamada',
  templateUrl: './chamada.component.html',
})
export class ChamadaComponent implements OnInit, OnDestroy {
  chamadas?: IChamada[];
  eventSubscriber?: Subscription;

  constructor(protected chamadaService: ChamadaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.chamadaService.query().subscribe((res: HttpResponse<IChamada[]>) => (this.chamadas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChamadas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChamada): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChamadas(): void {
    this.eventSubscriber = this.eventManager.subscribe('chamadaListModification', () => this.loadAll());
  }

  delete(chamada: IChamada): void {
    const modalRef = this.modalService.open(ChamadaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chamada = chamada;
  }
}
