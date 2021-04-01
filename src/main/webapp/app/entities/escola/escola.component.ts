import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEscola } from 'app/shared/model/escola.model';
import { EscolaService } from './escola.service';
import { EscolaDeleteDialogComponent } from './escola-delete-dialog.component';

@Component({
  selector: 'jhi-escola',
  templateUrl: './escola.component.html',
})
export class EscolaComponent implements OnInit, OnDestroy {
  escolas?: IEscola[];
  eventSubscriber?: Subscription;

  constructor(protected escolaService: EscolaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.escolaService.query().subscribe((res: HttpResponse<IEscola[]>) => (this.escolas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEscolas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEscola): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEscolas(): void {
    this.eventSubscriber = this.eventManager.subscribe('escolaListModification', () => this.loadAll());
  }

  delete(escola: IEscola): void {
    const modalRef = this.modalService.open(EscolaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.escola = escola;
  }
}
