import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICidade } from 'app/shared/model/cidade.model';
import { CidadeService } from './cidade.service';
import { CidadeDeleteDialogComponent } from './cidade-delete-dialog.component';

@Component({
  selector: 'jhi-cidade',
  templateUrl: './cidade.component.html',
})
export class CidadeComponent implements OnInit, OnDestroy {
  cidades?: ICidade[];
  eventSubscriber?: Subscription;

  constructor(protected cidadeService: CidadeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cidadeService.query().subscribe((res: HttpResponse<ICidade[]>) => (this.cidades = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCidades();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICidade): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCidades(): void {
    this.eventSubscriber = this.eventManager.subscribe('cidadeListModification', () => this.loadAll());
  }

  delete(cidade: ICidade): void {
    const modalRef = this.modalService.open(CidadeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cidade = cidade;
  }
}
