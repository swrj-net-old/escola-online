import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUnidade } from 'app/shared/model/unidade.model';
import { UnidadeService } from './unidade.service';
import { UnidadeDeleteDialogComponent } from './unidade-delete-dialog.component';

@Component({
  selector: 'jhi-unidade',
  templateUrl: './unidade.component.html',
})
export class UnidadeComponent implements OnInit, OnDestroy {
  unidades?: IUnidade[];
  eventSubscriber?: Subscription;

  constructor(protected unidadeService: UnidadeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.unidadeService.query().subscribe((res: HttpResponse<IUnidade[]>) => (this.unidades = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUnidades();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUnidade): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUnidades(): void {
    this.eventSubscriber = this.eventManager.subscribe('unidadeListModification', () => this.loadAll());
  }

  delete(unidade: IUnidade): void {
    const modalRef = this.modalService.open(UnidadeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.unidade = unidade;
  }
}
